$ErrorActionPreference = 'Stop'
$projectRoot = (Resolve-Path -LiteralPath (Join-Path $PSScriptRoot '..')).Path
$failures = [System.Collections.Generic.List[string]]::new()

function Require-Text([string]$relativePath,[string]$pattern,[string]$message) {
  $target = Join-Path $projectRoot $relativePath
  if (-not (Test-Path -LiteralPath $target)) { $failures.Add("Missing $relativePath"); return }
  $content = Get-Content -LiteralPath $target -Raw
  if ($content -notmatch $pattern) { $failures.Add($message) }
}

Require-Text 'index.html' 'legal-compliance\.js' 'The legal controls are not loaded by index.html.'
Require-Text 'index.html' 'privacy\.html' 'The Privacy Policy is not linked from index.html.'
Require-Text 'index.html' 'terms\.html' 'The Terms are not linked from index.html.'
Require-Text 'manifest.webmanifest' '"orientation"\s*:\s*"portrait-primary"' 'The PWA manifest is not portrait-primary.'
Require-Text 'cloud-auth.js' 'learner_13_plus.*adult_guardian.*educator' 'Cloud signup does not enforce the eligible account roles.'
Require-Text 'supabase/migrations/202608150001_legal_privacy_controls.sql' 'create table if not exists public\.legal_consents' 'The consent migration is incomplete.'
Require-Text 'supabase/migrations/202608150001_legal_privacy_controls.sql' 'create table if not exists public\.privacy_requests' 'The privacy-request migration is incomplete.'
Require-Text 'supabase/functions/account-delete/index.ts' 'deleteUser\(user\.id' 'The authenticated account deletion function is incomplete.'
Require-Text 'multilingual-preview.js' 'Independent practice pathway' 'The course-framework disclaimer is missing.'

foreach ($requiredDocument in @('privacy.html','terms.html','THIRD-PARTY-NOTICES.txt','ASSET-PROVENANCE.md','EDUCATIONAL-CLAIMS-REGISTER.md','TRADEMARK-PRELIMINARY-SEARCH.md','LEGAL-READINESS-DEPLOYMENT.md')) {
  if (-not (Test-Path -LiteralPath (Join-Path $projectRoot $requiredDocument))) { $failures.Add("Missing $requiredDocument") }
}

$serviceWorker = Get-Content -LiteralPath (Join-Path $projectRoot 'sw.js') -Raw
$shellReferences = [regex]::Matches($serviceWorker,"'\./([^']+)'\s*,?") | ForEach-Object { $_.Groups[1].Value }
foreach ($reference in $shellReferences) {
  if (-not (Test-Path -LiteralPath (Join-Path $projectRoot $reference))) { $failures.Add("Service-worker file is missing: $reference") }
}

if ($failures.Count) {
  $failures | ForEach-Object { Write-Error $_ }
  exit 1
}

Write-Output "Legal-readiness source checks passed ($($shellReferences.Count) cached application files verified)."
Write-Output 'Commercial release remains blocked until every HOLD item in ASSET-PROVENANCE.md is resolved and qualified counsel approves the final policies and mark clearance.'
