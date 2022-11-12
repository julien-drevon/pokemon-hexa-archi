docker-compose down
if (Test-Path "./postgresql"){
    rmdir  ./postgresql -Force -Recurse 
}
if (Test-Path "./postgresqldata"){
    rmdir  ./postgresqldata -Force -Recurse 
}

docker network create pokedex
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

docker network rm pokedex
exit $result
