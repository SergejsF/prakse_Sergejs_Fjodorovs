Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/jammy64"
  config.vm.network "forwarded_port", guest: 3001, host: 3001
  config.vm.synced_folder ".", "/vagrant", type: "virtualbox"

  config.vm.provision "shell", path: "vm_provision.sh"
end
