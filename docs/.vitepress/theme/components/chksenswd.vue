<template>
  <div class="container">
  <input v-model="userInput" type="text" placeholder="输入文字">
  <button @click="checkSensitive" :disabled="isLoading" class="btn">{{ isLoading ? '等待中' : '判断' }}</button>
  <div v-if="isLoading" class="loading">正在进行敏感词判断，请稍候...</div>
  <div v-if="result" class="result">
    <div class="result-item">
    <span class="label">违禁词:</span>
    <span class="value">{{ result[0] }}</span>
    </div>
    <div v-if="result[1]" class="result-item">
    <span class="label">匹配结果:</span>
    <span class="value">{{ result[1] }}</span>
    </div>
    <!--div v-if="result[2]" class="result-item">
    <span class="label">Regex: </span>
    <span class="value">{{ result[2] }}</span>
    </div-->
  </div>
  <div v-else class="no-match">当前语句中不包含违禁词</div>
  </div>
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
  };
  },
  methods: {
  async checkSensitive() {
    this.isLoading = true;
    this.result = await this.checkSensitiveWord(this.userInput);
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
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.loading {
  margin-top: 10px;
  color: #888;
}

.result {
  margin-top: 20px;
  padding: 10px;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
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
