if (Test-Path "./postgresql"){
    rmdir  ./postgresql -Force -Recurse 
}
if (Test-Path "./postgresqldata"){
    rmdir  ./postgresqldata -Force -Recurse 
}

docker-compose build 
docker-compose run pokedex-e2e
#docker-compose down
$result= $LASTEXITCODE
docker-compose down

if (Test-Path "./postgresql"){
    rmdir  ./postgresql -Force -Recurse 
}
if (Test-Path "./postgresqldata"){
    rmdir  ./postgresqldata -Force -Recurse 
}

exit $result
