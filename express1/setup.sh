apt-get update 
apt-get --assume-yes install curl sudo gnupg
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash - 

apt-get update 
apt-get --assume-yes install nodejs npm build-essential

npm install -g npm

cd $(npm root -g)/npm && npm install fs-extra && sed -i -e s/graceful-fs/fs-extra/ -e s/fs.rename/fs.move/ ./lib/utils/rename.js