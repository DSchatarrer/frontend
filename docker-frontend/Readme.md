cofigurar @ -->  https://jasonwatmore.com/vue-3-vite-add-path-alias-to-src-in-vite-config
https://www.youtube.com/watch?v=HyCO6nMdxC0

csslayout ---->  https://layout.bradwoods.io/

git config --global user.name "abb"
git config --global user.email "xxxxxxxx.com"
git remote add origin https://github.com/xxxx/xxxxx.git
git push origin main --force
git push --set-upstream origin main

<!-- CONTRUIR IMAGEN -->
docker build -f Dockerfile.frontend -t nombre_de_tu_imagen .

<!-- CORRER IMAGEN -->
docker run -d -p 8000:8000 nombre_de_tu_imagen

<!-- SUBIR IMAGEN A DOCKER REGISTRY DE AZURE -->
docker login xxxxxxx.azurecr.io -u xxxx -p xxxxx
docker build -f Dockerfile.frontend -t xxxxxx.azurecr.io/<nombre imagen>:<tag> .
docker push xxxxxx.azurecr.io/<nombre imagen>:<tag>