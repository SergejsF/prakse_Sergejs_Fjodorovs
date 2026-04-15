#!/usr/bin/env bash
set -e

# Atjaunina pakotņu sarakstu un instalē nepieciešamās atkarības
sudo apt-get update -y
sudo apt-get install -y curl build-essential

# Instalē Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Pāriet uz projekta direktoriju un uzstāda atkarības
cd /vagrant
npm ci --production || npm install --production

# Nodrošina, ka `PORT` vides mainīgais izmanto 3001 (ja nepieciešams)
export PORT=3001

# Palaiž lietotni fonā (vienkāršs `nohup` risinājums)
nohup npm start > app.log 2>&1 &
