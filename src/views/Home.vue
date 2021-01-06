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
        <button type="submit" class="btn btn-primary ml-2">Post image</button>
      </form>
      <instagram-card
        v-for="card in filteredCards"
        :key="card.url"
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
// @ is an alias to /src
import instagramCard from "@/components/instagramCard.vue";
import store from "@/store.js";
import { db } from "@/firebase";

let cards = [];

cards = [
  {
    url: "https://picsum.photos/id/1/400/400",
    description: "Laptop #1",
    time: "Few minutes ago..",
  },
  {
    url: "https://picsum.photos/id/2/400/400",
    description: "Laptop #2",
    time: "Hour ago..",
  },
  {
    url: "https://picsum.photos/id/3/400/400",
    description: "Laptop #3",
    time: "Few hours ago..",
  },
];

export default {
  name: "Home",
  data: function() {
    return {
      cards,
      store,
      ime: "",
      prezime: "",
      newImageDescription: "",
      newImageUrl: "",
    };
  },
  methods: {
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
