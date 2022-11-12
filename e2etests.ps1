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
# docker build -t poke-test -f=DockerfileDev .
# docker run poke-test
# $result = $LASTEXITCODE
#  if($result -eq 0){
#  docker build -t poke-prod -f=DockerfileProd .
#  docker run poke-prod
# }