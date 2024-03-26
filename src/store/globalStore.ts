import { reactive } from "vue";

const globalStore = reactive<{
  latestError: {
    statusCode: number,
    code: string | number,
    message: string
  }
}>({
  latestError: {
    statusCode: null,
    code: null,
    message: null
  }
});

export default globalStore