#!/bin/bash

echo "项目地址： $1"

# 进入项目
cd $1

# 安装依赖
yarn add webpack webpack-cli @babel/core babel-loader @babel/preset-env @babel/preset-react html-webpack-plugin webpack-dev-server -D

yarn add react react-dom