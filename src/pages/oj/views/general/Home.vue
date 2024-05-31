<template>
  <Row type="flex" justify="space-around">
    <Col :span="22">
      <div class="apcs-home">
        <div class="apcs-header">
          <img class="apcs-logo" src="/static/logo.png" alt="" />
          <div>
            <h1>APCS 模擬測驗系統</h1>
            <p>
              "每個月最後一個星期六" 都會有一場固定的 APCS 模擬賽，時間皆為晚上
              20:00 - 22:30 共 2.5
              小時，希望大家能夠持續參與，給予免費擔任出題者的出題團隊們一些小小的鼓勵！支持我們繼續做下去！
            </p>
            <div class="apcs-social-container">
              <a
                class="apcs-social discord"
                href="https://discord.gg/RnhATqeMtd"
                target="_blank"
                >Discord</a
              >
              <a
                class="apcs-social"
                href="https://www.instagram.com/apcs.simulation/"
                target="_blank"
                >Instagram</a
              >
            </div>
          </div>
        </div>
        <div class="ivu-card apcs-countdown-container">
          <div>
            <h3>下次模擬測驗</h3>
            <div class="apcs-countdown simulation"></div>
          </div>
          <div>
            <h3>下次 APCS 測驗</h3>
            <div class="apcs-countdown apcs"></div>
          </div>
        </div>
      </div>

      <panel shadow v-if="contests.length" class="contest">
        <div slot="title">
          <Button type="text" class="contest-title" @click="goContest">{{
            contests[index].title
          }}</Button>
        </div>
        <Carousel
          v-model="index"
          trigger="hover"
          autoplay
          :autoplay-speed="6000"
          class="contest"
        >
          <CarouselItem v-for="(contest, index) of contests" :key="index">
            <div class="contest-content">
              <div class="contest-content-tags">
                <Button type="info" shape="circle" size="small" icon="calendar">
                  {{ contest.start_time | localtime("YYYY-M-D HH:mm") }}
                </Button>
                <Button
                  type="success"
                  shape="circle"
                  size="small"
                  icon="android-time"
                >
                  {{ getDuration(contest.start_time, contest.end_time) }}
                </Button>
                <Button
                  type="warning"
                  shape="circle"
                  size="small"
                  icon="trophy"
                >
                  {{ contest.rule_type }}
                </Button>
              </div>
              <div class="contest-content-description">
                <blockquote v-html="contest.description"></blockquote>
              </div>
            </div>
          </CarouselItem>
        </Carousel>
      </panel>
      <Announcements class="announcement"></Announcements>
    </Col>
  </Row>
</template>
<style>
.apcs-social.discord {
  background-color: #5d6af2;
}
.apcs-home {
  margin: 1rem auto;
}
.apcs-home h1 {
  margin-bottom: 1rem;
}
.apcs-header {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin-block: 2rem;
}
.apcs-header p {
  max-width: 30rem;
  font-size: 1.25em;
}
.apcs-logo {
  width: 15rem;
  border-radius: 50%;
}
.apcs-social-container {
  margin-top: 2rem;
}
.apcs-social {
  padding: 7px 20px;
  border-radius: 40px;
  background-color: rgb(249, 96, 182);
  color: #fff;
  box-shadow: rgba(5, 145, 255, 0.1) 0px 2px 0px 0px;
  margin-right: 0.5rem;
  font-size: 1.25rem;
}

/* countdown */

.apcs-countdown-container {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 5rem;
  padding-top: 2rem;
}
.apcs-countdown {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2em;
  font-family: "Noto Sans TC", sans-serif;
  margin-bottom: 2em;
}
.apcs-countdown > div {
  font-weight: 600;
  font-size: 2em;
}
.apcs-countdown-container h3 {
  margin-bottom: 0.5rem;
}
.caption {
  font-size: 1rem;
}
</style>
<script>
import Announcements from "./Announcements.vue";
import api from "@oj/api";
import time from "@/utils/time";
import { CONTEST_STATUS } from "@/utils/constants";

export default {
  name: "home",
  components: {
    Announcements,
  },
  data() {
    return {
      contests: [],
      index: 0,
    };
  },
  mounted() {
    let params = { status: CONTEST_STATUS.NOT_START };
    api.getContestList(0, 5, params).then((res) => {
      this.contests = res.data.data.results;
    });
    this.countDown();
  },
  methods: {
    getDuration(startTime, endTime) {
      return time.duration(startTime, endTime);
    },
    goContest() {
      this.$router.push({
        name: "contest-details",
        params: { contestID: this.contests[this.index].id },
      });
    },
    countDown() {
      const countdownFunc = (date, element) => {
        var end = new Date(date);
        const countdownS = document.querySelector(".apcs-countdown." + element);
        let countDown = setInterval(() => {
          var now = new Date();
          var time = end - now; // Difference in milliseconds
          var days = Math.floor(time / (1000 * 60 * 60 * 24))
            .toString()
            .padStart(2, "0");
          var hours = Math.floor(
            (time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          )
            .toString()
            .padStart(2, "0");
          var minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60))
            .toString()
            .padStart(2, "0");
          var seconds = Math.floor((time % (1000 * 60)) / 1000)
            .toString()
            .padStart(2, "0");

          countdownS.innerHTML = `
          <div>
            <div class="days">${days}</div>
            <div class="caption">days</div>
          </div>
          <div>
            <div class="hours">${hours}</div>
            <div class="caption">hours</div>
          </div>
          <div>
            <div class="minutes">${minutes}</div>
            <div class="caption">minutes</div>
          </div>
          <div>
            <div class="seconds">${seconds}</div>
            <div class="caption">seconds</div>
          </div>
        `;
          if (time <= 0) {
            clearInterval(countDown);
            countdownS.innerHTML =
              "<div class='expired'>Event has started!</div>";
          }
        }, 1000);
      };
      fetch("/static/apcs-date.json")
        .then((response) => response.json())
        .then((data) => {
          countdownFunc(data.simulation, "simulation");
          countdownFunc(data.apcs, "apcs");
        })
        .catch((error) => console.error("Error fetching data:", error));
    },
  },
};
</script>

<style lang="less" scoped>
.contest {
  &-title {
    font-style: italic;
    font-size: 21px;
  }
  &-content {
    padding: 0 70px 40px 70px;
    &-description {
      margin-top: 25px;
    }
  }
}

.announcement {
  margin-top: 20px;
}
</style>
