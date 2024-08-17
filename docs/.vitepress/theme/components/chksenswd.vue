<template>
  <div class="container">
    <form @submit.prevent="submitReview" class="review-form">
      <div class="form-group">
        <label for="content" class="text">文本内容:</label>
        <input type="text" id="content" v-model.trim="reviewData.content" required class="form-control">
      </div>
      <div class="form-group">
        <label for="content" class="text">Level:</label>
        <input type="text" id="level" v-model.trim="reviewData.level" required class="form-control">
      </div>
      <div class="form-group">
        <label for="channel" class="text">适用区域:</label>
        <select id="channel" v-model="reviewData.channel" required class="form-control">
          <option v-for="channel in channels" :key="channel" :value="channel">
            {{ channel }}
          </option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary">提交</button>
    </form>
    <div v-if="apiMessage" class="api-message" :class="{'success': apiMessage.startsWith('文本不包含敏感词'), 'error': !apiMessage.startsWith('文本不包含敏感词')}">
      {{ apiMessage }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      reviewData: {
        content: '',
        channel: 'item_comment',
        level: '0'
      },
      channels: [
        'item_comment',
        'sign_content',
        'check_long_numbers',
        'chatserver',
        'ai_command_processor',
        'World',
        'HuaYuTing'
      ],
      apiMessage: ''
    };
  },
  methods: {
    submitReview() {
      fetch('https://liliya233.uk/openapi/other/review_text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.reviewData)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        this.apiMessage = data.message || 'Submission was successful, but no message was provided.';
      })
      .catch(error => {
        if (error instanceof TypeError) {
          this.apiMessage = 'Network error: ' + error.message;
        } else {
          this.apiMessage = error.message || 'An error occurred while submitting the form.';
        }
      });
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.review-form {
  background: #fbfbfb;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.form-group {
  margin-bottom: 15px;
}

.form-control {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  color: gray;
  border-radius: 4px;
  background-color: #f9f9f9;
  box-sizing: border-box; /* 防止宽度超过父容器 */
  }

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}

.btn:hover {
  background-color: #0056b3;
}

.api-message {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f9f9f9;
}

.success {
  color: #155724;
  background-color: #d4edda;
  border-color: #c3e6cb;
}

.error {
  color: #721c24;
  background-color: #f8d7da;
  border-color: #f5c6cb;
}

.text{
  color: gray;
}
</style>
