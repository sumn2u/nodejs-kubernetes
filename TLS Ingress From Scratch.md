```
Sumans-Air:workspace iamsuman$ minikube start 
Starting local Kubernetes v1.10.0 cluster...
Starting VM...
Getting VM IP address...
Moving files into cluster...
Setting up certs...
Connecting to cluster...
Setting up kubeconfig...
Starting cluster components...
Kubectl is now configured to use the cluster.
Loading cached images from config file.
```
```
Sumans-Air:workspace iamsuman$ minikube status
minikube: Running
cluster: Running
kubectl: Correctly Configured: pointing to minikube-vm at 192.168.99.100
```
```
Sumans-Air:workspace iamsuman$ minikube addons list 
- addon-manager: enabled
- coredns: disabled
- dashboard: enabled
- default-storageclass: enabled
- efk: disabled
- freshpod: disabled
- heapster: disabled
- ingress: disabled
- kube-dns: enabled
- metrics-server: disabled
- nvidia-driver-installer: disabled
- nvidia-gpu-device-plugin: disabled
- registry: disabled
- registry-creds: enabled
- storage-provisioner: enabled
```

```
Sumans-Air:workspace iamsuman$ minikube addons enable ingress
ingress was successfully enabled
```

```
Sumans-Air:workspace iamsuman$ kubectl get pods -n kube-system
NAME                                             READY     STATUS              RESTARTS   AGE
etcd-minikube                                    1/1       Running             0          1m
kube-addon-manager-minikube                      1/1       Running             4          1d
kube-apiserver-minikube                          1/1       Running             0          1m
kube-controller-manager-minikube                 1/1       Running             0          1m
kube-dns-86f4d74b45-4wxwq                        2/3       Running             15         1d
kube-proxy-kr994                                 1/1       Running             0          43s
kube-scheduler-minikube                          1/1       Running             4          1d
kubernetes-dashboard-5498ccf677-wzvtd            1/1       Running             13         1d
nginx-ingress-controller-584b9d4fb8-6szlr        1/1       Running             3          15h
nginx-ingress-default-backend-5455568d9d-4xgd8   1/1       Running             1          15h
registry-creds-z8dsq                             0/1       ContainerCreating   0          17h
storage-provisioner                              1/1       Running             12         1d
tiller-deploy-67d8b477f7-blv79                   1/1       Running             1          15h
```
```
Sumans-Air:workspace iamsuman$ clear 
```
```
Sumans-Air:workspace iamsuman$ kubeclt run nginx --image=nginx
-bash: kubeclt: command not found
```
```
Sumans-Air:workspace iamsuman$ kubectl run nginx --image=nginx
deployment.apps/nginx created
```
```
Sumans-Air:workspace iamsuman$ kubectl get po
NAME                     READY     STATUS              RESTARTS   AGE
nginx-65899c769f-59zrt   0/1       ContainerCreating   0          7s
Sumans-Air:workspace iamsuman$ kubectl get po
NAME                     READY     STATUS              RESTARTS   AGE
nginx-65899c769f-59zrt   0/1       ContainerCreating   0          13s
Sumans-Air:workspace iamsuman$ kubectl get po
NAME                     READY     STATUS              RESTARTS   AGE
nginx-65899c769f-59zrt   0/1       ContainerCreating   0          17s
Sumans-Air:workspace iamsuman$ kubectl get po
NAME                     READY     STATUS              RESTARTS   AGE
nginx-65899c769f-59zrt   0/1       ContainerCreating   0          20s
Sumans-Air:workspace iamsuman$ kubectl get po
NAME                     READY     STATUS              RESTARTS   AGE
nginx-65899c769f-59zrt   0/1       ContainerCreating   0          27s
Sumans-Air:workspace iamsuman$ kubectl get po
NAME                     READY     STATUS    RESTARTS   AGE
nginx-65899c769f-59zrt   1/1       Running   0          29s
```
```
Sumans-Air:workspace iamsuman$ kubectl expose deployment nginx --port 80
service/nginx exposed


Sumans-Air:workspace iamsuman$ vim ingress.yml

Sumans-Air:workspace iamsuman$ cat ingress.yml 
---
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: nginx
spec:
 rules:
  - host:
    http:
     paths:
      - backend:
         serviceName: nginx
         servicePort: 80 
```
```
Sumans-Air:workspace iamsuman$ kubectl apply -f ingress.yml 
ingress.extensions/nginx created

```

```
Sumans-Air:workspace iamsuman$ cat ingress.yml 
---
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: nginx
spec:
 rules:
  - host:
    http:
     paths:
      - backend:
         serviceName: nginx
         servicePort: 80 
```
```
Sumans-Air:workspace iamsuman$ vim ingress.yml 
```
```
Sumans-Air:workspace iamsuman$ kubectl apply -f ingress.yml 
ingress.extensions/nginx configured
```
```
Sumans-Air:workspace iamsuman$ echo "$(minikube ip) example.com"| sudo tee -a /etc/hosts
Password:
Sorry, try again.
Password:
192.168.99.100 example.com
```
```
Sumans-Air:workspace iamsuman$ cat /etc/hosts | tail -n 1
192.168.99.100 example.com
```
```
Sumans-Air:workspace iamsuman$ curl example.com
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
<style>
    body {
        width: 35em;
        margin: 0 auto;
        font-family: Tahoma, Verdana, Arial, sans-serif;
    }
</style>
</head>
<body>
<h1>Welcome to nginx!</h1>
<p>If you see this page, the nginx web server is successfully installed and
working. Further configuration is required.</p>

<p>For online documentation and support please refer to
<a href="http://nginx.org/">nginx.org</a>.<br/>
Commercial support is available at
<a href="http://nginx.com/">nginx.com</a>.</p>

<p><em>Thank you for using nginx.</em></p>
</body>
</html>
```
```
Sumans-Air:workspace iamsuman$ openssl --help
openssl:Error: '--help' is an invalid command.

Standard commands
asn1parse      ca             ciphers        crl            crl2pkcs7      
dgst           dh             dhparam        dsa            dsaparam       
ec             ecparam        enc            engine         errstr         
gendh          gendsa         genrsa         nseq           ocsp           
passwd         pkcs12         pkcs7          pkcs8          prime          
rand           req            rsa            rsautl         s_client       
s_server       s_time         sess_id        smime          speed          
spkac          verify         version        x509           

Message Digest commands (see the `dgst' command for more details)
md2            md4            md5            mdc2           rmd160         
sha            sha1           

Cipher commands (see the `enc' command for more details)
aes-128-cbc    aes-128-ecb    aes-192-cbc    aes-192-ecb    aes-256-cbc    
aes-256-ecb    base64         bf             bf-cbc         bf-cfb         
bf-ecb         bf-ofb         cast           cast-cbc       cast5-cbc      
cast5-cfb      cast5-ecb      cast5-ofb      des            des-cbc        
des-cfb        des-ecb        des-ede        des-ede-cbc    des-ede-cfb    
des-ede-ofb    des-ede3       des-ede3-cbc   des-ede3-cfb   des-ede3-ofb   
des-ofb        des3           desx           rc2            rc2-40-cbc     
rc2-64-cbc     rc2-cbc        rc2-cfb        rc2-ecb        rc2-ofb        
rc4            rc4-40         seed           seed-cbc       seed-cfb       
seed-ecb       seed-ofb       
```
```
Sumans-Air:workspace iamsuman$ openssl req -x509 -newkey rs:4096 -sha256 -nodes -keyout tls.key -out tls.crt -subj "/CN=example.com" -days 365
req [options] <infile >outfile
where options  are
 -inform arg    input format - DER or PEM
 -outform arg   output format - DER or PEM
 -in arg        input file
 -out arg       output file
 -text          text form of request
 -pubkey        output public key
 -noout         do not output REQ
 -verify        verify signature on REQ
 -modulus       RSA modulus
 -nodes         don't encrypt the output key
 -engine e      use engine e, possibly a hardware device
 -subject       output the request's subject
 -passin        private key password source
 -key file      use the private key contained in file
 -keyform arg   key file format
 -keyout arg    file to send the key to
 -rand file:file:...
                load the file (or the files in the directory) into
                the random number generator
 -newkey rsa:bits generate a new RSA key of 'bits' in size
 -newkey dsa:file generate a new DSA key, parameters taken from CA in 'file'
 -newkey ec:file generate a new EC key, parameters taken from CA in 'file'
 -[digest]      Digest to sign with (md5, sha1, md2, mdc2, md4)
 -config file   request template file.
 -subj arg      set or modify request subject
 -multivalue-rdn enable support for multivalued RDNs
 -new           new request.
 -batch         do not ask anything during request generation
 -x509          output a x509 structure instead of a cert. req.
 -days          number of days a certificate generated by -x509 is valid for.
 -set_serial    serial number to use for a certificate generated by -x509.
 -newhdr        output "NEW" in the header lines
 -asn1-kludge   Output the 'request' in a format that is wrong but some CA's
                have been reported as requiring
 -extensions .. specify certificate extension section (override value in config file)
 -reqexts ..    specify request extension section (override value in config file)
 -utf8          input characters are UTF8 (default ASCII)
 -nameopt arg    - various certificate name options
 -reqopt arg    - various request text options
```
```
Sumans-Air:workspace iamsuman$ openssl req -x509 -newkey rs:4096 -sha256 -nodes -keyout tls.key -out tls.crt -subj "/CN=example.com" -days 365
req [options] <infile >outfile
where options  are
 -inform arg    input format - DER or PEM
 -outform arg   output format - DER or PEM
 -in arg        input file
 -out arg       output file
 -text          text form of request
 -pubkey        output public key
 -noout         do not output REQ
 -verify        verify signature on REQ
 -modulus       RSA modulus
 -nodes         don't encrypt the output key
 -engine e      use engine e, possibly a hardware device
 -subject       output the request's subject
 -passin        private key password source
 -key file      use the private key contained in file
 -keyform arg   key file format
 -keyout arg    file to send the key to
 -rand file:file:...
                load the file (or the files in the directory) into
                the random number generator
 -newkey rsa:bits generate a new RSA key of 'bits' in size
 -newkey dsa:file generate a new DSA key, parameters taken from CA in 'file'
 -newkey ec:file generate a new EC key, parameters taken from CA in 'file'
 -[digest]      Digest to sign with (md5, sha1, md2, mdc2, md4)
 -config file   request template file.
 -subj arg      set or modify request subject
 -multivalue-rdn enable support for multivalued RDNs
 -new           new request.
 -batch         do not ask anything during request generation
 -x509          output a x509 structure instead of a cert. req.
 -days          number of days a certificate generated by -x509 is valid for.
 -set_serial    serial number to use for a certificate generated by -x509.
 -newhdr        output "NEW" in the header lines
 -asn1-kludge   Output the 'request' in a format that is wrong but some CA's
                have been reported as requiring
 -extensions .. specify certificate extension section (override value in config file)
 -reqexts ..    specify request extension section (override value in config file)
 -utf8          input characters are UTF8 (default ASCII)
 -nameopt arg    - various certificate name options
 -reqopt arg    - various request text options
```
```
Sumans-Air:workspace iamsuman$ openssl req -x509 -newkey rsa:4096 -sha256 -nodes -keyout tls.key -out tls.crt -subj "/CN=example.com" -days 365
Generating a 4096 bit RSA private key
...............++
..................................................................................................................................................................................++
writing new private key to 'tls.key'
-----
```
```
Sumans-Air:workspace iamsuman$ ls 
CustomTShirt		chat-maps		ingress.yml		tls.crt
avendy			ingress			nodejs-kubernetes	tls.key
```
```
Sumans-Air:workspace iamsuman$ kubectl create secret tls example-com-tls --cert=tls.crt --key=tls.key
secret/example-com-tls created
```
```
Sumans-Air:workspace iamsuman$ kubectl get secret -o yaml
apiVersion: v1
items:
- apiVersion: v1
  data:
    ca.crt: LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUM1ekNDQWMrZ0F3SUJBZ0lCQVRBTkJna3Foa2lHOXcwQkFRc0ZBREFWTVJNd0VRWURWUVFERXdwdGFXNXAKYTNWaVpVTkJNQjRYRFRFNE1EZ3hPREUxTkRRd01sb1hEVEk0TURneE5qRTFORFF3TWxvd0ZURVRNQkVHQTFVRQpBeE1LYldsdWFXdDFZbVZEUVRDQ0FTSXdEUVlKS29aSWh2Y05BUUVCQlFBRGdnRVBBRENDQVFvQ2dnRUJBTnJKCkRqV2tPbGxGdDBmcXdndjFpRGdBYVdTRGxkdElXalFsVGh1Z1F3Y2tTV243eTlvTXFmTU56S2EzcjQzSkE2bEgKSmJwdWFQSzNSc3RnOWtvck5EMFA5Vi92S3R3bmFIZEw1eFE3R0pIcWQ5OVFoQ2xiTVpTbGkxR0dWVHFhdzg5LwpSQlZQd2FvNXVKTWdraXJ3WDlWei93a1dqUWNnd0JGUHVIcjl1Wm5yZEQydDF6THZXa2hkQjMxVHpKK1Z0UHJ4CnFyelpkMUtGT05YeHBEa1JuL3FvTGY2bUFDYnBBR3RacjN1cDZqKytZU3Uvc1JETVBNTVVXQkNwSWxRSlMzM3YKQmRHMGNReTVUb0VDdnhVclZOM0ROQy9qbS9XQ25lZmJETlRUSnJhc1E4UmRxc3lWOGFVcXRvK0orKytFMnk2NQpRS1BlbDJzNHBaNkpPZmJiMG1NQ0F3RUFBYU5DTUVBd0RnWURWUjBQQVFIL0JBUURBZ0trTUIwR0ExVWRKUVFXCk1CUUdDQ3NHQVFVRkJ3TUNCZ2dyQmdFRkJRY0RBVEFQQmdOVkhSTUJBZjhFQlRBREFRSC9NQTBHQ1NxR1NJYjMKRFFFQkN3VUFBNElCQVFCeW5XeHpFT0dhSE14eXorMy94Q1JZL29Yb04wb09XMTVocTl0eEs5SCtpVitQUVVwOApodFcwZ2svL091K0paelRjL3RQeUFIdS8ySGdxNStNdTV2REE3ZElZa3h2TVpaUEJFWEg2T0pwNnRHRW5rWlA2CmhNQVhaeWJ2dzJCSEF4eU11bFh5bThQRlAwSnZPbyt4U1ZDelRVN1VGZU9rcUlmSWN6R2dYMEtCVjBPUmJaVUcKVmtvLy9zQ2ZpcndlSkFEaEhjWWpSTTJHMCtCS3I1TzJSVjNwMmpFYzZzU2FpSDZESVl3S0hkUnV0VTZSYVhJeQpDUWY2TEpyMDZ6VW1QdGhuc0RUWUNkQmx6OU1FeHlZMnRINGsxK0NlRStEOTNSTmlHUDI4aVVuZXU0MjBvazYyClE1UzFVMFBqQXdya2dJSG1DQnhKeUN4U29zQkpZT0J0dlFTRAotLS0tLUVORCBDRVJUSUZJQ0FURS0tLS0tCg==
    namespace: ZGVmYXVsdA==
    token: ZXlKaGJHY2lPaUpTVXpJMU5pSXNJbXRwWkNJNklpSjkuZXlKcGMzTWlPaUpyZFdKbGNtNWxkR1Z6TDNObGNuWnBZMlZoWTJOdmRXNTBJaXdpYTNWaVpYSnVaWFJsY3k1cGJ5OXpaWEoyYVdObFlXTmpiM1Z1ZEM5dVlXMWxjM0JoWTJVaU9pSmtaV1poZFd4MElpd2lhM1ZpWlhKdVpYUmxjeTVwYnk5elpYSjJhV05sWVdOamIzVnVkQzl6WldOeVpYUXVibUZ0WlNJNkltUmxabUYxYkhRdGRHOXJaVzR0ZEhwbmJuZ2lMQ0pyZFdKbGNtNWxkR1Z6TG1sdkwzTmxjblpwWTJWaFkyTnZkVzUwTDNObGNuWnBZMlV0WVdOamIzVnVkQzV1WVcxbElqb2laR1ZtWVhWc2RDSXNJbXQxWW1WeWJtVjBaWE11YVc4dmMyVnlkbWxqWldGalkyOTFiblF2YzJWeWRtbGpaUzFoWTJOdmRXNTBMblZwWkNJNkltVXhNR0k0WXpjMUxXRXpZell0TVRGbE9DMWhaR001TFRBNE1EQXlOems0TmpBNU5TSXNJbk4xWWlJNkluTjVjM1JsYlRwelpYSjJhV05sWVdOamIzVnVkRHBrWldaaGRXeDBPbVJsWm1GMWJIUWlmUS5WZ1RndkdjaEJzNW1pR3NPT2RZX19YNEktZVpraWJMSktiNXkydXI0MzhQdXViU0ZWNUVjekFMcUtxTjhLZHhvRjlZUEZpWlFIOWVkaHktanFDLU1lc3NCYlRHMkdGNDFNTGpTME1NM0t4YzlraFAzNElUWnN5MVBHTlRIekN3a0ZuN1dzRHV5SlMzRWpEWkVXaEtXMUVuOTZFWDlpemZMZnFteGdUMG4tMHk4bGdaQThYTWhnTDFWUU5XSkoxWEt6eUdINnF2cDJkNThRM3hOVVBYeVpFRkhabGxiaEZvcmZuYVVDbGtVSUFEV2F1LTBwYWhtLWo4cEt2RDR6ODUzMnlFMVJZQkF4MWIwQWhrUGt4cnY1SDlnRWtxWGl6NVIyQXotdWxhcnlZaWNWaFY5VkllaXZCaVhYRnVBLWZ0bzBPVXpVZnF5VXgxNlhDUEw5VVkxVnc=
  kind: Secret
  metadata:
    annotations:
      kubernetes.io/service-account.name: default
      kubernetes.io/service-account.uid: e10b8c75-a3c6-11e8-adc9-080027986095
    creationTimestamp: 2018-08-19T15:45:20Z
    name: default-token-tzgnx
    namespace: default
    resourceVersion: "292"
    selfLink: /api/v1/namespaces/default/secrets/default-token-tzgnx
    uid: e10ec9e8-a3c6-11e8-adc9-080027986095
  type: kubernetes.io/service-account-token
- apiVersion: v1
  data:
    tls.crt: LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUZKakNDQXc2Z0F3SUJBZ0lKQUtBdG1TMWE4UHFXTUEwR0NTcUdTSWIzRFFFQkN3VUFNQll4RkRBU0JnTlYKQkFNVEMyVjRZVzF3YkdVdVkyOXRNQjRYRFRFNE1EZ3lNVEV6TWpVeE1sb1hEVEU1TURneU1URXpNalV4TWxvdwpGakVVTUJJR0ExVUVBeE1MWlhoaGJYQnNaUzVqYjIwd2dnSWlNQTBHQ1NxR1NJYjNEUUVCQVFVQUE0SUNEd0F3CmdnSUtBb0lDQVFDMkZNdll0aFdoNnBmNzJXaXg5MHVFbzI2ODRqMDJ1dGNZdVFEOFNvMEx3RmM3dDhpeU5NYlAKWFY4cENBejZjSkZZVEs3dlRsdXYzK2I4WWpXOEhSMGlzN0FvOWw1ZHVHaHBBTEE0VFgvS3YvZ2RLU2VtOGlSYwo2NHBMYjRXbXVnUUErK0Z3VTJzdjJFSzhvTjhuTU5McVZ2NStZTkpXMHd1Yy94dG1JaDdCQ3JVSVUwcW42ZjJDCnVjT1BTVmVmbmxGZ2R5UlJmWE1pcDFlOGdNWnFSK3V6OU9VME1ZVHVvVSs1T0FhY3lOS0NzamlPdUlybW1iaGgKVHozRUhEYzN0NG1XbmIvUHJSSFlxZTZBa012bFJrZHY2cjFycTlFS21FYkdrS3NxQVVnNGtVVHJvZE1ZNHVWYQpCeUhnOGNWQ0wvSjI4THFBRVlZYUFMcnJSMm44aVBhbE05ZXhGZGd2NDlqZjRMM2dqU1ZsQzFPRjI4elFid0JvCkNhMStPdkQ4azhKYk1YaGhNWUdjczZlVmFkUndoMGV3UXNjVXdFTjMrdUg0OHNRZkpzQ1NoUndhY2RXOEFsVWMKckhXRW01bFkxQ01LWmZLS3oya2FCbEJ5dVhURGdFN0IxZFdGTGRmYVJCOUo4bi9nNXJDQUorYTB3WXpWQUw3QwphMm9hdzhZQjlMSHJMUTJQT0lycHZJbjl5V2RDelF4M3J1SXpjOVhIL29KNFdtTHRrL1ArMERxdytDN0R6NklNCmJRN2pqbzdzS3pwRWNnWkJKaW5ZWG1KQW1maUlRbldpK05mTHZnZ0ZvUzBYenNqRWs2eEZhUTdGcGNDckpnOWYKTEl3TnpFNUpVSEpiRk5UYUhEbDVkallHdyt0RGp3WkNQRGhSUFRtL3lGa01aTVViMFpRK0J3SURBUUFCbzNjdwpkVEFkQmdOVkhRNEVGZ1FVUnNzM2lIa3VBMFd4M2xucjN3bXVveERmSVM0d1JnWURWUjBqQkQ4d1BZQVVSc3MzCmlIa3VBMFd4M2xucjN3bXVveERmSVM2aEdxUVlNQll4RkRBU0JnTlZCQU1UQzJWNFlXMXdiR1V1WTI5dGdna0EKb0MyWkxWcncrcFl3REFZRFZSMFRCQVV3QXdFQi96QU5CZ2txaGtpRzl3MEJBUXNGQUFPQ0FnRUFuYlM4L2JqbwpUL2czS1BjN3AySUMvN1FHSzJpaE1SVjBKeGxMa1h2UEk5RmdwdHJERHhHZ1lHZDdhSnlRUm4xTmJQeGQwY0FFClh6Zmg4dmNNSSs1eW82OGZsWHpYRWhFcjJYR0lkbVVlZFNXVGtaNVo4YjlpS0JJK0dialVKYzlJWWhqa2hCSksKaHlWWTJycHVkazdsTkRJSStmcXpuWS9aZDVqV3g1NVJTekViL2YwSVZCODFDQjRVY3JpVFBHU2tHRnhMVkRrdwo3RTVvbjhIaElzMnN1cVcxU2gwNmJrVnlxcmdiVmoyY1IyeHhzYjZoOFRmNVM3ZHl3bnBsdFBUeUNjV2YyTzcxCkdYenlHdUdLMEo0d1d2OE40VlE5blEyNUxHV3FGYVdvaTA0MmFPbXZYMlBLS1JTOWYvOEV3UXAwOWxLV2RXbk4KRkYvd1V3UHpCbitBQjVmekZDeDg3WGJtK0lHSkVZdVQvakRHQ1hKSDA0ZWtOdlk1elB5cVZ6Z3V3b1dLbEVLTAptUkdZWUFpd21wMGlFVDB3N3VwMWNieVErU0k0RnRjQkxPRmsrUHVidi9SYTFtQnNqMEw4cHVvWlBJQ0VheFBhCllYbDh0RzdSZGYxRi9acHd5V0xLN08rd05vbHdSUjZ2algzc3NvaERnUnlCeXVqdWNlZ2gwZ0o2eEpncjhRUWgKN2l1ZnBJRmlheUhFNmNEdjZONkw2RElJRU8vei9HZnI4NUtTSXZCMmlxdkU0WWVQVTBZOXpHaHU1cVowYk1RawptNTYrODQ3Znp4ekhHSTMvR2xpUExnY24rRWZ2b1VXU0ZGN1ppRDBlM1dSQkVURkNsa25iUmg3czdBQzVKeGVuClN1WFVpVHppbTBXOE9HdWd5eU9Cb3lPNThJbzhqa212bU4wPQotLS0tLUVORCBDRVJUSUZJQ0FURS0tLS0tCg==
    tls.key: LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQpNSUlKS0FJQkFBS0NBZ0VBdGhUTDJMWVZvZXFYKzlsb3NmZExoS051dk9JOU5yclhHTGtBL0VxTkM4QlhPN2ZJCnNqVEd6MTFmS1FnTStuQ1JXRXl1NzA1YnI5L20vR0kxdkIwZElyT3dLUFplWGJob2FRQ3dPRTEveXIvNEhTa24KcHZJa1hPdUtTMitGcHJvRUFQdmhjRk5yTDloQ3ZLRGZKekRTNmxiK2ZtRFNWdE1MblA4YlppSWV3UXExQ0ZOSwpwK245Z3JuRGowbFhuNTVSWUhja1VYMXpJcWRYdklER2FrZnJzL1RsTkRHRTdxRlB1VGdHbk1qU2dySTRqcmlLCjVwbTRZVTg5eEJ3M043ZUpscDIvejYwUjJLbnVnSkRMNVVaSGIrcTlhNnZSQ3BoR3hwQ3JLZ0ZJT0pGRTY2SFQKR09MbFdnY2g0UEhGUWkveWR2QzZnQkdHR2dDNjYwZHAvSWoycFRQWHNSWFlMK1BZMytDOTRJMGxaUXRUaGR2TQowRzhBYUFtdGZqcncvSlBDV3pGNFlUR0JuTE9ubFduVWNJZEhzRUxIRk1CRGQvcmgrUExFSHliQWtvVWNHbkhWCnZBSlZIS3gxaEp1WldOUWpDbVh5aXM5cEdnWlFjcmwwdzRCT3dkWFZoUzNYMmtRZlNmSi80T2F3Z0NmbXRNR00KMVFDK3dtdHFHc1BHQWZTeDZ5ME5qemlLNmJ5Si9jbG5RczBNZDY3aU0zUFZ4LzZDZUZwaTdaUHovdEE2c1BndQp3OCtpREcwTzQ0Nk83Q3M2UkhJR1FTWXAyRjVpUUpuNGlFSjFvdmpYeTc0SUJhRXRGODdJeEpPc1JXa094YVhBCnF5WVBYeXlNRGN4T1NWQnlXeFRVMmh3NWVYWTJCc1ByUTQ4R1FqdzRVVDA1djhoWkRHVEZHOUdVUGdjQ0F3RUEKQVFLQ0FnQXNhZkkzVUdNQ2RlalF3LzFudTd5dUEvZVZGMUo3TVNRYW9iWDkxR21IUGttSkJaRnM5cmF3Q2tTVwpDNkt1ekJxSUFWeUNmd2lhWS9GQ0N1cTBraDF6UTRWcTJIMjRPcTB0UDcrOFhCc1o1NjJyMzBnT3p1M1R4SmlkClFmekY2SVhsZjR0RURQVU9YS0FheHRyb0FsN1FUcHdSVTZpN0NRdkNKZkFXLzZla3l1blJ1QTl6MmYyK2ozV0cKVkF1Tm9kNlR1endlckkwVEhPS24xbm1Qbnk5OVcvVTB3QWQrOWRZdWhkNEhERzFjK0FBWHdDZ1JpOW1QMHZacwpDYjNtVjF5MllwQlJKaFErVjJVWDh6bnBHVFYvdFRDelBOdm15N0luNlUzM0Z3ejR6MmFTVzR6VWV6UWF1N2FsCjJoT1Z5NEJIUnYwWEZDOHoxSTNEcWszT0RkS3JtNUlIYmh3ZUVBWTZaYXIvOEM4R2poOFY4cUxFWmZ4VXMrZHoKVDNyMDMrcTYybk10dHQvak1ML1R3aEY0MVBpQjZMWlV4TXlTelFLS1pjbWoxRUxKYTBYblJjd09SWUo0RVc5aApEUXJ0aGd0S1R4MmhsdTJMNUllZWdITGt6UzBjZjUvRkJPM0N2c0hlVUY4ZSs5RTY2ZjR4TjlhNytVWUhwVjNtCnZmQkJTUDRYcUhQUFNVQ2k5dytRZ1VTcWdKem1IekMxL2tKNUZNam1vaytUblcxK3R1TTZmWDVTOVhOdEhCYkwKRzNrY2dsSStnSTdGVE45Yk5HaUpDZjhJSXpCZjFCeXA0WTF4c21WUUVuTkJwOWNxVUpFckNTbzN0bW9kcWtGTgpnaitaOGM5NUdHSlIweFprRVZxRkxoUHpUQ3Jnc1VFRXIwSlFTM05nb3NzL1FsNzJrUUtDQVFFQTd6VHdKUFg3CktjWld2bHJuc3JaQVh5R3N5N2t6NmhZeGxWNktPMTlxTWE3U0NjSFpPWnNOQW81QXdXTHZ0OENMbVpMM2RaUFEKdGV5dHNtV2thMTJlVmVjNEdoTE9SdVRkakFDNEJVQTNyaWltOWdUTFFQSHFJZ3kwMkZEak0xaDNzNEhWRU5zMwpMT1ZPZGdsLzNqWFZLS3ZLV1Q4SlhhcCtqc1hQMTJWLzNnRGEzUy8wMFlYMG9KdjI0Y3Yydm9kMXRSRzIxM3pWCnFkVGVTVjdOTnBJbEdTcE1KdXVSeVdpa2s0cjl4Q01XcnBUQVB5eVh2UXNFeERtazJVY0s1NER2WmNiTFdjd28KK3NIRHg2Yi9MMkp4d2FlY1BVY2x6akpvREplblFxMW85N21IR2o0bkpVajJwQy9SVDZDeGpTVFhibWp5Zk5QSgpnNlBBc0Q2eWVNeDk5UUtDQVFFQXd0MHdWUXJnK0thSHluS0RFVGY2cWwvM2x3Z0FMYWlzSHh5RmhNMEt5MlFLCnVMeEM4blpWaE1temJqcVBpVlZDOEo5SjIwMmZQS3hvWEJLY2RZWUhsNmtyVHJWUXpVUW1tRWd0SlNFaXE0M08KeWVWNVJ5OWQrcEJlUmxPTHZ0cnBMR2xVSGhocEhKanRwVzl3ZEtKbkxKQnBQT2djQnZsNWxTRmtjOGFIcER2RQpSTXJlOVJqUHRJanI1RW43U3loL3Y1c3NWVHplVzIremNmNWMwVTVQb3RyeThqMEJ1c3JGbW54UjRZcTl3MkpuCmpZQk9TKzZ2N1Q1VkR1L0lNNFZyZUx0RE93WktnajVTUlNZZ0M2ZFltMFhMZnlGbDBVaTlCU0c1VmxWeWYvYzAKUWVSMXRGbUxZRUJVeEtHcUgyQWphVStNR1VyRy83RnJRQUpMaU9veWl3S0NBUUVBeDNWMTlPdmpaWjhMdjZoZgpZUVpWUUwzOHJ0Y2NjY25WeUg1UGQxaUZYUzR2MTVEN1IreUErYXVTVlc3aEFuQ2NOdzkwSm1kOTllU0hwYVRaClorbGxXSzMzZXM1SmtKWFFJcWlLeVY0Vno3UDRIRlk5QVVkMityTnJyS0F1QXlkMmtJam5HQ29pcE40RUFhckUKSTQ3eDBmc0ZQRXV5ekphWTl3WDgyOWUzdW04dUVKZW5aWHAwVStRWkJZaWtrNVN5VXF5VnNMTllHa2Ywbm10ZApaRzZTWHB5RmFVS3VpcW9sNlIxUm90VzdXUkdTQ0Z0dm4yTnJzdzk1NU84M0tYaTZwandRWGkwOTBuSDFoU283CnlOQW1tTnJoRGJ1Z3k0SCtmdG1KejdCM1FYRkROViswRm9Qem5VNStFdzZrWGxQbEN4eVpiZnJQSW1ST0RPZ0sKdTIyUWJRS0NBUUErMlBucW83eVZWWmg4S2R5dDVBRWJqQ0lkZXY0YnU4ZnZyTkkvVjZaQW5QNThRSFBUSVdsSgpqNGdvYUFpOVFWdDZvZFUvUHRTNXk5MUl2TlByYjVQcFRTMWprRVVFUHhPM2o2Zkh6dDBRdVliVlJRYU5kL0IyCmpMTnJPU3pjSEZ5UjcxS3E5aktJZjZZOThpZ3g1ZU1pMDF5dHdTcXc4U3RPZHR1Z0g0ckY1R1RUeng2RHJFSHAKTnpQbGlCcmRUYTJPRGEwSnZMejJmcHRBaThwQjAyRUo1Rlh3M000L0FZRWo1eTY5Y0hMdG5rSkp0L1VJdG0zVgpOWUpYYyt4OCtXNEZIVmg4by9YSjlmR3d6YkFPTWlYNHhsVHdwc1BnOFBYTnZ1ZTR1WXhaUzFCMlpBbTJaaDcyCnB5anYxamc1TUZlYmNvVjc3c3NwMG40RndmZThxOVFyQW9JQkFFbjRkVHpmdXNSY0s4WU9rM04yUTNzcHUxY1YKWU4rRmJjYy8xZTd1VE5udkZUZ211MElvVHM0dHBtZEZhNFJiSDNpQ1ZWZHJiaFFVRUxqZjN0SnlEYjloQlZSVApuRGZsZ2lKTUp4ampBZXA5L0VOMjJQd1hSY2MvZDZJRDhZWkF6VEdjdmtoL1RPWkV0RXpXOG5tSXlUSFM2eFkrCkJvS0F0QWYrcGxGOHczUHArV2hFcC9ka0g2d2hFN2RqM3pVSTdmT0x4RW5QVTlNaXd2b25keEQ5WUVEUDVVbzMKaDVQU0NrNWNHUTBBL0luenU1OTBOTjR6cnJrTFRFTytOUXVCTVFoWERCMlAya3BrZ2J5SzJJWTB6YWdUenFLcwpocmNkSkR2QnJJQkxzTWlpVEpMVkxKeldxRmJjSEhxK2pHYVZNSW0zK3NxcE9sdW5ZdjVNTmc0cHNDUT0KLS0tLS1FTkQgUlNBIFBSSVZBVEUgS0VZLS0tLS0K
  kind: Secret
  metadata:
    creationTimestamp: 2018-08-21T13:26:28Z
    name: example-com-tls
    namespace: default
    resourceVersion: "59164"
    selfLink: /api/v1/namespaces/default/secrets/example-com-tls
    uid: cf24d18b-a545-11e8-a294-080027986095
  type: kubernetes.io/tls
- apiVersion: v1
  data:
    ca.crt: LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUM1ekNDQWMrZ0F3SUJBZ0lCQVRBTkJna3Foa2lHOXcwQkFRc0ZBREFWTVJNd0VRWURWUVFERXdwdGFXNXAKYTNWaVpVTkJNQjRYRFRFNE1EZ3hPREUxTkRRd01sb1hEVEk0TURneE5qRTFORFF3TWxvd0ZURVRNQkVHQTFVRQpBeE1LYldsdWFXdDFZbVZEUVRDQ0FTSXdEUVlKS29aSWh2Y05BUUVCQlFBRGdnRVBBRENDQVFvQ2dnRUJBTnJKCkRqV2tPbGxGdDBmcXdndjFpRGdBYVdTRGxkdElXalFsVGh1Z1F3Y2tTV243eTlvTXFmTU56S2EzcjQzSkE2bEgKSmJwdWFQSzNSc3RnOWtvck5EMFA5Vi92S3R3bmFIZEw1eFE3R0pIcWQ5OVFoQ2xiTVpTbGkxR0dWVHFhdzg5LwpSQlZQd2FvNXVKTWdraXJ3WDlWei93a1dqUWNnd0JGUHVIcjl1Wm5yZEQydDF6THZXa2hkQjMxVHpKK1Z0UHJ4CnFyelpkMUtGT05YeHBEa1JuL3FvTGY2bUFDYnBBR3RacjN1cDZqKytZU3Uvc1JETVBNTVVXQkNwSWxRSlMzM3YKQmRHMGNReTVUb0VDdnhVclZOM0ROQy9qbS9XQ25lZmJETlRUSnJhc1E4UmRxc3lWOGFVcXRvK0orKytFMnk2NQpRS1BlbDJzNHBaNkpPZmJiMG1NQ0F3RUFBYU5DTUVBd0RnWURWUjBQQVFIL0JBUURBZ0trTUIwR0ExVWRKUVFXCk1CUUdDQ3NHQVFVRkJ3TUNCZ2dyQmdFRkJRY0RBVEFQQmdOVkhSTUJBZjhFQlRBREFRSC9NQTBHQ1NxR1NJYjMKRFFFQkN3VUFBNElCQVFCeW5XeHpFT0dhSE14eXorMy94Q1JZL29Yb04wb09XMTVocTl0eEs5SCtpVitQUVVwOApodFcwZ2svL091K0paelRjL3RQeUFIdS8ySGdxNStNdTV2REE3ZElZa3h2TVpaUEJFWEg2T0pwNnRHRW5rWlA2CmhNQVhaeWJ2dzJCSEF4eU11bFh5bThQRlAwSnZPbyt4U1ZDelRVN1VGZU9rcUlmSWN6R2dYMEtCVjBPUmJaVUcKVmtvLy9zQ2ZpcndlSkFEaEhjWWpSTTJHMCtCS3I1TzJSVjNwMmpFYzZzU2FpSDZESVl3S0hkUnV0VTZSYVhJeQpDUWY2TEpyMDZ6VW1QdGhuc0RUWUNkQmx6OU1FeHlZMnRINGsxK0NlRStEOTNSTmlHUDI4aVVuZXU0MjBvazYyClE1UzFVMFBqQXdya2dJSG1DQnhKeUN4U29zQkpZT0J0dlFTRAotLS0tLUVORCBDRVJUSUZJQ0FURS0tLS0tCg==
    namespace: ZGVmYXVsdA==
    token: ZXlKaGJHY2lPaUpTVXpJMU5pSXNJbXRwWkNJNklpSjkuZXlKcGMzTWlPaUpyZFdKbGNtNWxkR1Z6TDNObGNuWnBZMlZoWTJOdmRXNTBJaXdpYTNWaVpYSnVaWFJsY3k1cGJ5OXpaWEoyYVdObFlXTmpiM1Z1ZEM5dVlXMWxjM0JoWTJVaU9pSmtaV1poZFd4MElpd2lhM1ZpWlhKdVpYUmxjeTVwYnk5elpYSjJhV05sWVdOamIzVnVkQzl6WldOeVpYUXVibUZ0WlNJNkltOXlZbWwwYVc1bkxYQmhibVJoTFdObGNuUXRiV0Z1WVdkbGNpMTBiMnRsYmkwMU5uZGtjeUlzSW10MVltVnlibVYwWlhNdWFXOHZjMlZ5ZG1salpXRmpZMjkxYm5RdmMyVnlkbWxqWlMxaFkyTnZkVzUwTG01aGJXVWlPaUp2Y21KcGRHbHVaeTF3WVc1a1lTMWpaWEowTFcxaGJtRm5aWElpTENKcmRXSmxjbTVsZEdWekxtbHZMM05sY25acFkyVmhZMk52ZFc1MEwzTmxjblpwWTJVdFlXTmpiM1Z1ZEM1MWFXUWlPaUkzTURrMVl6RTFZeTFoTkdNeExURXhaVGd0WVRZeU15MHdPREF3TWpjNU9EWXdPVFVpTENKemRXSWlPaUp6ZVhOMFpXMDZjMlZ5ZG1salpXRmpZMjkxYm5RNlpHVm1ZWFZzZERwdmNtSnBkR2x1Wnkxd1lXNWtZUzFqWlhKMExXMWhibUZuWlhJaWZRLnlCRWdwTXFHVzEtWTN2UHVzd3FFYncwWW9ha3UwTmFRaEo0UUQ0RG1vWk9ETjhKZ3N3bVVVZnB2ZnJ0UDhIN0Z5Ti0tTmJiZEpWZm1PX2FndmcySEpac0Zud1loV3AyQmpfb1I3eEdJTlk0N0c2YUROeXV0ZVUzdWdWVWZSSm1pNFJoM1Z5cDUxRll2aEFnSl9KNjlrODdVV1ZyZnpONUZUSWNZNy1RU05NTnlLenBma2ptd1huSUlnOS1vTmZzNnBmc2xyUkdRZlQ5S0pucHdNdC1lOWdyNUd6U0pUdUFKNndpbkZWa1hOc0NxcE9xbEpSNFJ0SHJEWkNmRU5KTlh0aGNTcW80bUpPT18tOHhMX214aWlyY3lFX19nc2JqcmhVcFdQTGtFYk5HS2pOdVJYVmhSVXFvLVZhOFdGSjlDM2dXa2Zkbk1uWHUxNUhkTVNqS0Y3Zw==
  kind: Secret
  metadata:
    annotations:
      kubernetes.io/service-account.name: orbiting-panda-cert-manager
      kubernetes.io/service-account.uid: 7095c15c-a4c1-11e8-a623-080027986095
    creationTimestamp: 2018-08-20T21:38:55Z
    name: orbiting-panda-cert-manager-token-56wds
    namespace: default
    resourceVersion: "40448"
    selfLink: /api/v1/namespaces/default/secrets/orbiting-panda-cert-manager-token-56wds
    uid: 709e7da9-a4c1-11e8-a623-080027986095
  type: kubernetes.io/service-account-token
kind: List
metadata:
  resourceVersion: ""
  selfLink: ""
```
```
Sumans-Air:workspace iamsuman$ vim ingress.yml 
```
```
Sumans-Air:workspace iamsuman$ cat ingress.yml 
---
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: nginx
spec:
 tls:
  - secretName: example-com-tls
    hosts:
     - example.com
 rules:
  - host: example.com
    http:
     paths:
      - backend:
         serviceName: nginx
         servicePort: 80 
```
```
Sumans-Air:workspace iamsuman$ kubectl apply -f ingress.yml 
ingress.extensions/nginx configured
```
```
Sumans-Air:workspace iamsuman$ curl -k https://example.com
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
<style>
    body {
        width: 35em;
        margin: 0 auto;
        font-family: Tahoma, Verdana, Arial, sans-serif;
    }
</style>
</head>
<body>
<h1>Welcome to nginx!</h1>
<p>If you see this page, the nginx web server is successfully installed and
working. Further configuration is required.</p>

<p>For online documentation and support please refer to
<a href="http://nginx.org/">nginx.org</a>.<br/>
Commercial support is available at
<a href="http://nginx.com/">nginx.com</a>.</p>

<p><em>Thank you for using nginx.</em></p>
</body>
</html>
Sumans-Air:workspace iamsuman$ curl --cacert tls.crt https://example.com
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
<style>
    body {
        width: 35em;
        margin: 0 auto;
        font-family: Tahoma, Verdana, Arial, sans-serif;
    }
</style>
</head>
<body>
<h1>Welcome to nginx!</h1>
<p>If you see this page, the nginx web server is successfully installed and
working. Further configuration is required.</p>

<p>For online documentation and support please refer to
<a href="http://nginx.org/">nginx.org</a>.<br/>
Commercial support is available at
<a href="http://nginx.com/">nginx.com</a>.</p>

<p><em>Thank you for using nginx.</em></p>
</body>
</html>
```
```
Sumans-Air:workspace iamsuman$
```
