
// compose file cheatsheat:
nerdctl compose up -d  --address /var/run/docker/containerd/containerd.sock
nerdctl compose down  --address /var/run/docker/containerd/containerd.sock
nerdctl compose ps  --address /var/run/docker/containerd/containerd.sock
nerdctl compose logs --address /var/run/docker/containerd/containerd.sock


// remove exited docker containers
docker rm $(docker ps --filter status=exited -q)