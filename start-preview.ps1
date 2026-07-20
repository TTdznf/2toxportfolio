param([int]$Port = 5500)

$listener = [System.Net.HttpListener]::new()
$listener.Prefixes.Add("http://localhost:$Port/")
$listener.Start()
Write-Host "Preview available at http://localhost:$Port/"

$types = @{ ".html" = "text/html; charset=utf-8"; ".css" = "text/css; charset=utf-8"; ".js" = "text/javascript; charset=utf-8"; ".png" = "image/png"; ".jpg" = "image/jpeg"; ".gif" = "image/gif"; ".svg" = "image/svg+xml"; ".ico" = "image/x-icon" }
$root = $PSScriptRoot
try {
  while ($listener.IsListening) {
    $context = $listener.GetContext()
    $relative = [uri]::UnescapeDataString($context.Request.Url.AbsolutePath.TrimStart('/'))
    if ([string]::IsNullOrWhiteSpace($relative)) { $relative = "index.html" }
    $path = [IO.Path]::GetFullPath((Join-Path $root $relative))
    if (!$path.StartsWith($root, [StringComparison]::OrdinalIgnoreCase) -or !(Test-Path -LiteralPath $path -PathType Leaf)) {
      $context.Response.StatusCode = 404
      $context.Response.Close()
      continue
    }
    $bytes = [IO.File]::ReadAllBytes($path)
    $extension = [IO.Path]::GetExtension($path).ToLowerInvariant()
    $context.Response.ContentType = if ($types.ContainsKey($extension)) { $types[$extension] } else { "application/octet-stream" }
    $context.Response.ContentLength64 = $bytes.Length
    $context.Response.OutputStream.Write($bytes, 0, $bytes.Length)
    $context.Response.Close()
  }
} finally { $listener.Stop() }
