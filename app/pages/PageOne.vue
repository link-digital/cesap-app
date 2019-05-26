<template>
  <Page actionBarHidden="true">
    <StackLayout class="page">


      <StackLayout class="pbx">
        <Image src="~/assets/img/pbx.jpg" stretch="aspectFit" />
      </StackLayout>

      <StackLayout class="titles" orientation="horizontal">
        <Label text="DEPENDENCIA" class="color-green-1" width="50%" />
        <Label text="EXTENSIÓN" class="color-green-1 text-right" width="50%" />
      </StackLayout>

      <GridLayout columns="*" rows="*">
        <ListView for="item in directory" class="list-view">
        <v-template>
          <StackLayout orientation="horizontal">
            <Label :text="item.name" width="65%" />
            <Label :text="item.ext" class="text-right" width="35%" horizontalAlignment="right" />
          </StackLayout>
        </v-template>
        </ListView>
      </GridLayout>

    </StackLayout>
  </Page>
</template>
