<!--
  Copyright Soramitsu Co., Ltd. All Rights Reserved.
  SPDX-License-Identifier: Apache-2.0
-->
<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css?family=IBM+Plex+Sans:300,400');
html {
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}
.el-icon {
  font-family: element-icons !important;
}
[class^="el-"]:not(i):not([class*='el-icon']),
[class*="el-"]:not(i):not([class*='el-icon']) {
  font-family: 'IBM Plex Sans', sans-serif !important;
}

#app {
  font-family: 'IBM Plex Sans', sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
}

a {
  color: black;
  transition: opacity .15s ease-in-out;
  cursor: pointer;
  text-decoration: none;
}

a:hover {
  opacity: 0.8;
}

.fullwidth {
  width: 100%;
}

.dashboard-column {
  height: 100vh;
  overflow: scroll;
}

.dashboard-column+.dashboard-column{
  border-left: solid 1px #dbe1e8;
}

.navigation-link {
  display: block;
  padding: 12px;
}

.navigation-link:hover{
  background-color: #F5F7FA;
}

.navigation-link.router-link-active {
  color: black;
  background-color: #f5f7fa;
  color: #e43e33;
  padding: 12px;
}

.attributes {
  padding: 0 1.5rem;
  flex: 1;
  overflow-x: scroll;
}

.column-title {
  padding: 1.20rem;
  font-size: 1rem;
  border-bottom: 1px solid #efefef;
}

.attribute-row {
  display: flex;
  justify-content: space-between;
}
.attribute-row > .attribute-card-title {
  flex: 0 1 auto;
  line-height: 3;
}
.attribute-row > .attribute-card {
  flex: 0 70%;
  max-width: 70%;
}

.attribute-row > .attribute-card > .attribute-card_image {
  width: 100%;
}

.attribute-card {
  border-radius: 4px;
  border: solid 1px #dcdfe6;
  padding: 10px 15px;
  margin-bottom: 12px;
  color: #909399;
  font-size: 0.8rem;
  word-break: break-all;
}

.attribute-card_link {
  color: #909399;
}

.attribute-card_link:hover {
  color: #e43e33;
}

.attribute-card-title {
  font-size: 14px;
  color: #000000;
  margin-bottom: 4px;
  font-weight: normal;
}

.attribute-shared {
  border-color: rgba(103,194,58,.2);
  background-color: rgba(103,194,58,.1);
}

.info-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/* Hacks to make table look cool */
/* TODO: Rewrite it better  */
tr.unselected-row td {
  border: none;
  cursor: pointer;
}

tr.selected-row td {
  background-color: #f5f7fa;
  color: #e43e33;
  border-bottom: solid 0px;
  padding: 12px 0;
  cursor: pointer;
}

.el-table__fixed::before {
  background: #ffffff;
}

.el-table__header .cell {
  font-weight: 500;
}

.more-icon {
  font-size: 1.2rem;
  color: grey
}
.more-icon.small {
  font-size: 0.8rem;
}
.more-icon:hover {
  color: #e43e33;
  cursor: pointer;
}

.sora-button {
  background-color: #ffffff !important;
  color: #000000            !important;
  border: 0                   !important;
  text-transform: uppercase   !important;
  border-radius: 2px          !important;
  font-size: 0.8rem           !important;
  line-height: 1rem           !important;
}
.btn-red {
  background-color: #e43e33 !important;
  border-color: #e43e33 !important;
}
.sora-button.btn-red {
  color: #ffffff !important;
}
.btn-red:hover {
  opacity: 0.8;
}
</style>
