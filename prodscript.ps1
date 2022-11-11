

docker build -t poke-test -f=DockerfileDev .
docker run poke-test
$result = $LASTEXITCODE
 if($result -eq 0){
 docker build -t poke-prod -f=DockerfileProd .
 docker run poke-prod
}