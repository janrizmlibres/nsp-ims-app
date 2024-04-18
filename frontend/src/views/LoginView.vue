<script setup>
import LoginLogo from "@/components/LoginLogo.vue";
import LoginPanel from "@/components/LoginPanel.vue";
</script>

<template>
  <div class="content">
    <LoginLogo />
    <LoginPanel />
  </div>
</template>

<style>
.content {
  display: flex;
  min-width: 10rem;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 1rem);
}

.leftSide {
  display: block;
  text-align: center;
  margin-right: 8rem;
}

.loginLogo {
  width: 20rem;
  height: 20rem;
}

.logoText {
  font-family: "DM Sans", sans-serif;
  font-size: 2.1rem;
  font-weight: bold;
  color: #265492;
  letter-spacing: 0.5rem;
  line-height: normal;
}

.rightSide {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30.625rem;
  height: 33.75rem;
  border-radius: 10px;
  background: white;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.1);
}

.formContainer {
  display: block;
  justify-content: left;
}

.formWelcomeText {
  font-family: "DM Sans", sans-serif;
  font-size: 2.1rem;
  font-weight: bold;
  color: #265492;
  right: 50%;
  letter-spacing: 0.3rem;
  line-height: normal;
  margin-bottom: 3rem;
}

.formLabelText {
  font-family: "DM Sans", sans-serif;
  font-size: 1rem;
  font-weight: bold;
  color: #265492;
  right: 50%;
  line-height: normal;
}

input {
  margin-top: -4rem;
  width: 20rem;
  height: 1.8rem;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 3px;
  border: 1px solid gray;
}

.loginButton {
  margin-top: 2.5rem;
  width: 10rem;
  height: 3rem;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 3px;
  background-color: #265492;
  color: white;
  font-family: "DM Sans", sans-serif;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  cursor: pointer;
}
</style>