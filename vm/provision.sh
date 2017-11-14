# Install virtual machine requirements
apt-get update
apt-get install -y apache2 python3-pip python3-dev libpq-dev postgresql postgresql-contrib libjpeg8-dev

rm -rf /var/www
ln -fs /vagrant /var/www

# Install python requirements
sudo pip3 install -U setuptools
sudo pip3 install -r /home/vagrant/propose/requirements.txt

# Create database and syncdb
echo "ALTER USER postgres PASSWORD 'postgres'" | sudo -u postgres psql

pushd /home/vagrant
touch .bash_aliases
echo "alias python=/usr/bin/python3" > .bash_aliases
source ./.bashrc
popd

pushd /home/vagrant/propose
/usr/bin/python3 manage.py migrate
popd

# Install npm
sudo curl -sL https://deb.nodesource.com/setup_8.x | sudo sh
sudo apt-get install -y nodejs

# Give everything in home folder back to vagrant user
chown -R vagrant:vagrant /home/vagrant