<template>
  <n-menu :options="menuOptions" v-model:value="DefaultSelectedMenu" v-bind="$attrs" />
</template>

<script lang="ts" setup>
import { MenuOption } from 'naive-ui';
import { AllowedComponentProps, ComponentCustomProps, computed, ComputedRef, PropType, Ref, ref, VNodeProps } from 'vue';
import { useRouter, useRoute, RouterLinkProps } from 'vue-router';
import helper from '../../foundation/helper';
import NaiveUI from '../../foundation/NaiveUI';

const Props = defineProps({
  options: {
    type: Array as PropType<Array<{
      link: string | AllowedComponentProps & ComponentCustomProps & VNodeProps & RouterLinkProps,
      label?: string,
      key: string,
    }>>
  },
});

const Router = useRouter();
const Route = useRoute();

const DefaultSelectedMenu = ref<string>(Route.name.toString());
Router.beforeResolve((to, from, next) => {
  DefaultSelectedMenu.value = to.name?.toString();
  next();
})

const menuOptions: ComputedRef<MenuOption[]> = computed(() => {
  return Props.options.map(optionItem => {
    if (helper.type(optionItem.link) === "string") {
      return {
        label: NaiveUI.createdRouterLinkLabel(optionItem.label, {
          to: optionItem.link
        }),
        key: optionItem.key
      }
    } else {
      return optionItem;
    }
  });
});

</script>

<style scoped>

</style>