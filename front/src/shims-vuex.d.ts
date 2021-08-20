import {LocalStore} from "@/domain/services/store";

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: LocalStore;
  }
}

declare module "vue/types/vue" {
  interface Vue {
    $store: LocalStore;
  }
}