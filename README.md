# nodejs-kubernetes
Kubernetes: Orchestrate Node.js example

# Requirements

Minikube requires that VT-x/AMD-v virtualization is enabled in BIOS. To check that this is enabled on OSX / macOS run:

    sysctl -a | grep machdep.cpu.features | grep VMX

If there's output, you're good!

# Prerequisites

- kubectl
- docker (for Mac)
- minikube
- virtualbox

```
brew update && brew install kubectl && brew cask install docker minikube virtualbox
```

# Verify

    docker --version                # Docker version 17.09.0-ce, build afdb6d4
    docker-compose --version        # docker-compose version 1.16.1, build 6d1ac21
    docker-machine --version        # docker-machine version 0.12.2, build 9371605
    minikube version                # minikube version: v0.22.3
    kubectl version --client        # Client Version: version.Info{Major:"1", Minor:"8", GitVersion:"v1.8.1", GitCommit:"f38e43b221d08850172a9a4ea785a86a3ffa3b3a", GitTreeState:"clean", BuildDate:"2017-10-12T00:45:05Z", GoVersion:"go1.9.1", Compiler:"gc", Platform:"darwin/amd64"}      
    
# Start

    minikube start
    
This can take a while, expected output:

    Starting local Kubernetes cluster...
    Kubectl is now configured to use the cluster.

Great! You now have a running Kubernetes cluster locally. Minikube started a virtual machine for you, and a Kubernetes cluster is now running in that VM.

# Check k8s

    kubectl get nodes
    
Should output something like:

    NAME       STATUS    ROLES     AGE       VERSION
    minikube   Ready     <none>    40s       v1.7.5
    
# Use minikube's built-in docker daemon:

    eval $(minikube docker-env)
    
Add this line to `.bash_profile` or `.zshrc` or ... if you want to use minikube's daemon by default (or if you do not want to set this every time you open a new terminal).

You can revert back to the host docker daemon by running:

    eval $(docker-machine env -u)
    
If you now run `docker ps`, it should now output something like:

```
CONTAINER ID        IMAGE                                         COMMAND                 CREATED             STATUS              PORTS               NAMES
e97128790bf9        gcr.io/google-containers/kube-addon-manager   "/opt/kube-addons.sh"   22 seconds ago      Up 22 seconds                           k8s_kube-addon-manager_kube-addon-manager-minikube_kube-system_c654b2f084cf26941c334a2c3d6db53d_0
69707e54d1d0        gcr.io/google_containers/pause-amd64:3.0      "/pause"                33 seconds ago      Up 33 seconds                           k8s_POD_kube-addon-manager-minikube_kube-system_c654b2f084cf26941c334a2c3d6db53d_0
```

# Build, deploy and run an image on your local k8s setup

First setup a local registry, so Kubernetes can pull the image(s) from there:

    docker run -d -p 3000:3000 --restart=always --name registry registry:2

## Build

First of, clone the repository and go inside the repo.

You can build the Dockerfile below locally if you want to follow this guide to the letter. Store the Dockerfile locally, preferably in an empty directory and run:

    docker build -t hello-world-image .
    
You should now have an image named 'hello-world-image' locally, check by using `docker images` (or your own image of course). You can then publish it to your local docker registry:

    docker tag hello-world-image localhost:3000/hello-world-image:0.1.0
    
Running `docker images` should now output the following:

```
REPOSITORY                                             TAG                 IMAGE ID            CREATED             SIZE
hello-world-image                                                 latest              cc949ad8c8d3        44 seconds ago      89.3MB
localhost:3000/hello-world-image                                  0.1.0               cc949ad8c8d3        44 seconds ago      89.3MB
httpd                                                  2.4-alpine          fe26194c0b94        7 days ago          89.3MB
```

## Deploy and run

Store the file below `deployment.yml` on your system and run the following:

    kubectl run hello-world-image --image=hello-world-image  --port=3000 --image-pull-policy=Never

   kubectl expose deployment hello-world-image --type=NodePort
    service "hello-world-image" exposed

 kubectl get svc
    NAME             CLUSTER-IP   EXTERNAL-IP   PORT(S)    AGE
    hello-world-image   10.0.0.102   <nodes>       3000/TCP   7s
    kubernetes       10.0.0.1     <none>        443/TCP    13m
    
You should now see your pod and your service:

    kubectl get all

The configuration exposes `hello-world-image` outside of the cluster, you can get the address to access it by running:

    minikube service hello-world-image --url
    
This should give an output like `http://192.168.99.100:30304` (the port will most likely differ). Go there with your favorite browser, you should see "Hello world!". You just accessed your application from outside of your local Kubernetes cluster!
    
# Kubernetes GUI

    minikube dashboard
    
# Delete deployment of hello-world-image

    kubectl delete deploy hello-world-image
    kubectl delete service hello-world-image
    
You're now good to go and deploy other images!

# Reset everything

    minikube stop;
    minikube delete;
    rm -rf ~/.minikube .kube;
    brew uninstall kubectl;
    brew cask uninstall docker virtualbox minikube;






