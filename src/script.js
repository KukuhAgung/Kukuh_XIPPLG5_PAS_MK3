var keyword = document.getElementById("search-input");
var tombolCari = document.getElementById("set");
var container = document.getElementById("container");

document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      {
        id: 1,
        name: "beras maknyuss",
        img: "1.png",
        unit: "/kg",
        price: 75000,
      },
      {
        id: 2,
        name: "indomie goreng",
        img: "2.png",
        unit: "/dus",
        price: 50000,
      },
      {
        id: 3,
        name: "gula pasir kiloan",
        img: "3.png",
        unit: "/kg",
        price: 20000,
      },
      {
        id: 4,
        name: "kopi kapal api sachet",
        img: "4.png",
        unit: "/renceng",
        price: 15000,
      },
      {
        id: 5,
        name: "sariwangi teh celup",
        img: "5.png",
        unit: "/pcs",
        price: 6200,
      },
      {
        id: 6,
        name: "minyak goreng 1l",
        img: "6.png",
        unit: "liter",
        price: 15000,
      },
      {
        id: 7,
        name: "tepung terigu 1kg",
        img: "7.png",
        unit: "/kg",
        price: 15000,
      },
      {
        id: 8,
        name: "bright gas u 5,5kg",
        img: "8.png",
        unit: "/5kg",
        price: 100000,
      },
      {
        id: 9,
        name: "susu frisan flag",
        img: "9.png",
        unit: "/kaleng",
        price: 19000,
      },
      {
        id: 10,
        name: "maya sarden 155g",
        img: "10.png",
        unit: "/kaleng",
        price: 11500,
      },
      {
        id: 11,
        name: "kornet sapi 200g",
        img: "11.png",
        unit: "/kaleng",
        price: 21800,
      },
    ],
    barang: [],
    total: 0,
    quantity: 0,

    searchItem: function () {
      const self = this;

      keyword.addEventListener("keyup", function () {
        if (!self.items) {
          console.error("Error: 'items' is not defined.");
          return;
        }

        const inputValue = keyword.value.toLowerCase();

        const filteredItems = self.items.filter((item) => {
          return item.name.toLowerCase().includes(inputValue);
        });

        // Clear existing filtered items
        self.barang = [];

        // Check if there are any filtered items
        if (filteredItems.length > 0) {
          // Add filtered items to the filteredItems array
          filteredItems.forEach((item) => {
            self.barang.push(item);
            console.log(self.barang);
          });
          const newHTML = self.barang
            .map(
              (filteredItems, index) => `
            <div class="barang1" x-data="{ index: ${index} }">
              <div class="bg-white border rounded overflow-hidden">
                <div class="">
                  <center><img src="./src/img/${
                    filteredItems.img
                  }" class="w-[90%] pt-2" alt="${filteredItems.name}"></center>
                </div>
                <div class="pt-2 pb-1 px-4">
                  <a href="#">
                    <h4 class="uppercase inline-block font-medium text-md mb-2 text-gray-800">${
                      filteredItems.name
                    }</h4>
                  </a>
                  <div class="flex items-baseline mb-1 space-x-2">
                    <p class="text-md font-semibold">${rupiah(
                      filteredItems.price
                    )}</p>
                    <p class="text-sm text-gray-400">${filteredItems.unit}</p>
                  </div>
                </div>
                <button type="submit" @click.prevent="$data.addToCart(barang)"
                  class="block w-full text-sm py-1 text-center text-white bg-emerald-600 border-emerald-600 rounded-b hover:bg-transparent hover:text-emerald-600 hover:border hover:border-emerald-600 transition">Tambah</button>
              </div>
            </div>
          `
            )
            .join("");
          container.innerHTML = newHTML;
        } else {
          console.log("No matching items found.");
        }
        console.log("Filtered Items:", filteredItems);
      });
    },
    addToCart(newItem) {
      console.log("Adding to cart:", newItem);
      const cartItem = this.$store.cart.items.find(
        (barang) => barang.id === newItem.id
      );

      if (!cartItem) {
        this.$store.cart.items.push({
          ...newItem,
          quantity: 1,
          total: newItem.price,
        });
        this.$store.cart.quantity++;
        this.$store.cart.total += newItem.price;
      } else {
        this.$store.cart.items = this.$store.cart.items.map((barang) => {
          if (barang.id !== newItem.id) {
            return barang;
          } else {
            barang.quantity++;
            barang.total = barang.price * barang.quantity;
            this.$store.cart.quantity++;
            this.$store.cart.total += barang.price;
            return barang;
          }
        });
      }
    },
  }));

  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      console.log("Adding to cart:", newItem);
      const cartItem = this.items.find((item) => item.id === newItem.id);

      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        this.items = this.items.map((item) => {
          if (item.id !== newItem.id) {
            return item;
          } else {
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;
          }
        });
      }
    },
    remove(id) {
      const cartItem = this.items.find((item) => item.id === id);

      if (cartItem.quantity > 1) {
        this.items = this.items.map((item) => {
          if (item.id !== id) {
            return item;
          } else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        });
      } else if (cartItem.quantity === 1) {
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    },
    removeAll() {
      this.items = [];
      this.quantity = 0;
      this.total = 0;
    },
  });
});

const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
};

function buatpesanan() {
  Swal.fire({
    icon: "success",
    title: "Pesanan berhasil dibuat!",
    showConfirmButton: true,
    confirmButtonColor: "#3085d6",
    confirmButtonText: "Lanjut",
  }).then((result) => {
    if (result.isConfirmed) {
      Alpine.store("cart").removeAll();
    }
  });
}

function deletepesanan() {
  Swal.fire({
    icon: "warning",
    title: "Konfirmasi",
    text: "Apakah Anda yakin ingin menghapus semua item dari keranjang?",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yakin",
    cancelButtonText: "Batal",
  }).then((result) => {
    if (result.isConfirmed) {
      Alpine.store("cart").removeAll();
      Swal.fire({
        icon: "success",
        title: "Item telah terhapus!",
        showConfirmButton: false,
        timer: 1600,
      });
    }
  });
}

const navbarNav = document.querySelector("#navbar-nav");
const cart = document.querySelector("#shop-cart");

document.querySelector("#hamburger-menu").onclick = () => {
  navbarNav.classList.toggle("right-[-60%]");
  navbarNav.classList.toggle("right-[-130%]");
};

const hamburger = document.querySelector("#hamburger-menu");
document.addEventListener("click", function (e) {
  if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("right-[-60%]");
    navbarNav.classList.add("right-[-130%]");
  }
});

document.querySelector("#shop-bag").onclick = () => {
  cart.classList.toggle("right-[-43%]");
  cart.classList.toggle("right-[-130%]");
};

const bag = document.querySelector("#shop-bag");
document.addEventListener("click", function (e) {
  if (!bag.contains(e.target) && !cart.contains(e.target)) {
    cart.classList.remove("right-[-43%]");
    cart.classList.add("right-[-130%]");
  }
});
