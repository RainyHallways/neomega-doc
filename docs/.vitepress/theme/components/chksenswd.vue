<template>
  <div class="container">
  <input v-model="userInput" type="text" placeholder="输入文字">
  <button @click="checkSensitive" :disabled="isLoading" class="btn">{{ isLoading ? '请等待...' : '提交' }}</button>
  <div v-if="isLoading" class="loading">正在进行敏感词判断，请稍候...</div>
  <div v-else>
    <div v-if="result" class="result">
      <div class="result-item">
      <span class="label">违禁词:</span>
      <span class="value">{{ result[0] }}</span>
      </div>
      <div v-if="result[1]" class="result-item">
      <span class="label">匹配结果:</span>
      <span class="value">{{ result[1] }}</span>
      </div>
      <!--div v-if="showregex" class="result-item">
      <span class="label">Regex: </span>
      <span class="value">{{ result[2] }}</span>
      </div-->
    </div>
    <div v-else class="no-match">当前语句中不包含违禁词</div>
    </div>
  </div>
  <div class="container"><input type="checkbox" id="checkbox" v-model="agree" /><label for="checkbox">本人同意不恶意使用此工具</label></div>
</template>

<script>
import nreg from "./new_reg.json";
export default {
  data() {
  return {
    userInput: "",
    result: null,
    isLoading: false,
    fullRegex: null,
    agree: false,
  };
  },
  methods: {
  async checkSensitive() {
    this.isLoading = true;
    if (this.agree) {
      this.result = await this.checkSensitiveWord(this.userInput);  
    } else { alert("您必须同意协议才能使用"); }
    this.isLoading = false;
  },
  checkSensitiveWord(word) {
    return new Promise((resolve) => {
    setTimeout(() => {
      for (let val in nreg.regex) {
      for (let n in nreg.regex[val]) {
        let cur = new RegExp(
        nreg.regex[val][n]
          .replace(/\(\?(i|\#\d)\)/g, "")
          .replace(/^.*?content=/g, "")
          .replace(/[\u4e00-\u9fa5]/g, (m) =>
          String.fromCharCode(m.charCodeAt(0) - 1)
          ),
        "ig"
        );
        let sm = word.match(cur);
        if (sm) {
        let replaceRegex = nreg.regex[val][n].replace(/\(\?(i|\#\d)\)/g, "");
        this.fullRegex = nreg.regex[val][n];
        resolve([sm,`${val}.${n}`,cur]);
        return;
        }
      }
      }
      resolve(null);
    }, 2000);
    });
  },
  },
};
</script>

<style scoped>
.container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  display: block;
  font-family: Arial, sans-serif;
}

input[type="text"] {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn {
  display: inline-block;
  margin: 5px 0;
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.checkbox {
  margin: 0 auto;
  text-align: center;
  font-size: 16px;
}

.loading {
  margin-top: 10px;
  color: #888;
}

.result {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #646cff;
  color: #646bff;
  border-radius: 4px;
}

.result-item {
  margin-bottom: 10px;
}

.label {
  font-weight: bold;
}

.no-match {
  margin-top: 20px;
  color: #888;
  text-align: center;
}
</style>
