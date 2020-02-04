<template>
  <Page actionBarHidden="true">
    <FlexboxLayout class="page">
      <StackLayout class="form">
        <Image class="logo" src="~/assets/img/login-logo.png"></Image>
        <Label class="font-roboto-cnd font-bold font-size-l3 text-center color-white title-1" text="CESAP"></Label>
        <Label class="font-roboto-cnd font-bold font-size-m1 text-center color-white" text="CENTRO SOCIAL DE AGENTES"></Label>
        <Label class="font-roboto-cnd font-bold font-size-m1 text-center color-white title-2" text="PATRULLEROS"></Label>
        <Label class="font-roboto-cnd font-bold font-size-s1 text-center color-white" text="POLICÍA NACIONAL DE COLOMBIA"></Label>
        <Label class="font-roboto-cnd font-bold font-size-s1 text-center color-white title-3" text="DIRECCIÓN DE BIENESTAR SOCIAL"></Label>

        <GridLayout rows="auto, auto, auto">
          <GridLayout columns="auto, *" row="0" class="input-field m-t-20" orientation="horizontal">
            <Image col="0" class="ico" src="~/assets/img/ico/user.png" width="19" height="19"></Image>
            <TextField col="1" class="input color-white" hint="Usuario" :isEnabled="!processing"
              keyboardType="email" autocorrect="false"
              autocapitalizationType="none" v-model="user.username"
              returnKeyType="next" @returnPress="focusPassword"></TextField>
          </GridLayout>

          <GridLayout columns="auto, *" row="1" class="input-field" orientation="horizontal">
            <Image col="0" class="ico" src="~/assets/img/ico/lock.png" width="19" height="19"></Image>
            <TextField col="1" class="input color-white" ref="password" :isEnabled="!processing"
              hint="Contraseña" secure="true" v-model="user.password"
              returnKeyType="done"></TextField>
          </GridLayout>

          <ActivityIndicator rowSpan="3" :busy="processing"></ActivityIndicator>
        </GridLayout>

        <Button text="INGRESAR" :isEnabled="!processing"
          @tap="submit" class="btn btn-green-1 btn-login"></Button>
        <Label *v-show="isLoggingIn" text="Olvidé mi contraseña"
          class="login-label m-t-20 color-white" @tap="forgotPassword()"></Label>
      </StackLayout>

    </FlexboxLayout>
  </Page>
</template>

<script>
  import Home from "./Home";

  export default {
    data() {
      return {
        isLoggingIn: true,
        processing: false,
        user: {
          username: "",
          password: "",
        }
      };
    },
    methods: {
      submit() {
        if (!this.user.username || !this.user.password) {
          this.alert(
            "Por favor ingrese su usuario y contraseña."
          );
          return;
        }

        this.processing = true;
        this.login();
      },

      logout() {
        this.$api.logout()
      },

      login() {
        this.$api
          .login(this.user)
          .then(() => {
            this.processing = false;
            this.$navigateTo(Home, {
              clearHistory: true
            });
          })
          .catch((e) => {
            this.processing = false;
            this.alert(
              "Error ingresando. Revise sus datos."
            );
          });
      },

      forgotPassword() {
        prompt({
          title: "Recordar contraseña",
          message: "Ingrese su número de documento.",
          inputType: "input",
          defaultText: "",
          okButtonText: "Ok",
          cancelButtonText: "Cancelar"
        }).then(data => {
          if (data.result) {
            this.$api
              .resetPassword(data.text.trim())
              .then(() => {
                this.alert(
                  "Proceso existoso. Siga las instrucciones enviadas a su correo registrado para continuar."
                );
              })
              .catch(() => {
                this.alert(
                  "Ocurrió un error. Intente nuevamente más tarde."
                );
              });
          }
        });
      },

      focusPassword() {
        this.$refs.password.nativeView.focus();
      },
      
      focusConfirmPassword() {
        if (!this.isLoggingIn) {
          this.$refs.confirmPassword.nativeView.focus();
        }
      },

      alert(message) {
        return alert({
          title: "CESAP",
          okButtonText: "OK",
          message: message
        });
      }
    }
  };
</script>

<style scoped type="scss">
@import "~/scss/app-variables";

.title-2
{
  margin-bottom: 5;
}

.title-3
{
  margin-bottom: 10;
}

.page {
  flex-direction: column;
  align-items: center;
  background: url(~/assets/img/login-bg.jpg);
  background-repeat: no-repeat;
  background-position: bottom center;
  background-size: cover;
}

.form {
  margin-left: 30;
  margin-right: 30;
  flex-grow: 2;
  vertical-align: middle;
}

.logo {
  margin-bottom: 12;
  width: 93;
  height: 102;
}

.input-field .ico{
  margin-right: 10;
}

.input:disabled {
  opacity: 0.5;
}

.input-field .input{
  margin-top: 0;
}

.login-label {
  horizontal-align: center;
  margin-top: 20;
  color: #ffffff;
}
</style>