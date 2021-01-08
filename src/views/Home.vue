<template>
  <div class="row">
    <div class="col-2"></div>
    <div class="col-7">
      <form @submit.prevent="postNewImage" class="form-inline mb-5">
        <div class="form-group">
          <label for="imageUrl">Image URL</label>
          <input
            v-model="newImageUrl"
            type="text"
            class="form-control ml-2"
            placeholder="Enter the image URL"
            id="imageUrl"
          />
        </div>
        <div class="form-group">
          <label for="imageDescription">Description</label>
          <input
            v-model="newImageDescription"
            type="text"
            class="form-control ml-2"
            placeholder="Enter the image description"
            id="imageDescription"
          />
        </div>
        <button type="button" class="btn btn-primary ml-2" @click="provjera()">
          Post image
        </button>
      </form>
      <instagram-card
        v-for="card in filteredCards"
        :key="card.id"
        :info="card"
      />
    </div>
    <div class="col-3">
      <div>
        <input
          type="ime"
          v-model="ime"
          class="form-control"
          id="primjerIme"
          placeholder="Vase ime"
        />
        <input
          type="prezime"
          v-model="prezime"
          class="form-control"
          id="primjerPrezime"
          placeholder="Vase prezime"
        />
        <div id="imePrezime">{{ imePrezime }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import instagramCard from "@/components/instagramCard.vue";
import store from "@/store.js";
import { db } from "@/firebase";

export default {
  name: "Home",
  data: function() {
    return {
      cards: [],
      store,
      ime: "",
      prezime: "",
      newImageDescription: "",
      newImageUrl: "",
    };
  },
  mounted() {
    this.getPosts();
  },
  methods: {
    provjera() {
      if (!this.newImageDescription || !this.newImageUrl) {
        alert("Oba polja moraju biti popunjena");
      } else {
        this.postNewImage();
      }
    },
    getPosts() {
      console.log("Firebase dohvat..");

      db.collection("posts")
        .orderBy("posted_at", "desc")
        .limit(10)
        .get()
        .then((query) => {
          this.cards = [];
          query.forEach((doc) => {
            const data = doc.data();

            this.cards.push({
              id: doc.id,
              time: data.posted_at,
              description: data.desc,
              url: data.url,
            });
          });
        });
    },
    postNewImage() {
      const imageUrl = this.newImageUrl;
      const imageDescription = this.newImageDescription;

      db.collection("posts")
        .add({
          url: imageUrl,
          desc: imageDescription,
          email: store.currentUser,
          posted_at: Date.now(),
        })
        .then((doc) => {
          console.log("Spremljeno", doc);
          this.newImageDescription = "";
          this.newImageUrl = "";
          this.getPosts();
        })
        .catch((e) => {
          console.error(e);
        });
    },
  },
  computed: {
    imePrezime() {
      let result = this.ime + " " + this.prezime;
      return result;
    },
    filteredCards() {
      let termin = this.store.searchTerm;

      return this.cards.filter((card) => card.description.includes(termin));
    },
  },
  components: {
    instagramCard,
  },
};
</script>

<style scoped>
#primjerPrezime {
  margin-top: 10px;
}
#imePrezime {
  margin-top: 10px;
  border-style: ridge;
  border-radius: 5%;
}
</style>
