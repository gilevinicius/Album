var vm = new Vue({
  vuetify: new Vuetify(),
  el: "#app",
  data: function data() {
    return {
      chaveApi: "563492ad6f91700001000001b8114da9f6bd49429c99b7fcb8146be6",
      urlApi : `https://api.pexels.com/v1/curated?page=1&per_page=80`,
      fotos: [],
      fotosPorPagina: 18,
      fotosPaginados: [],
      favoritos:[],
      paginaAtual : 1,
      dialog: true,
      section1: true,
      section2: false,
      snackbar: false,
      timeout: 2000,
      text: "Adicionado aos favoritos",
      voltarTopo : false
    }
  },
  methods: {

    fetchImagens() {
      fetch(this.urlApi,{
        headers: {
          Authorization: this.chaveApi
        }
      })
      .then(resp => {return resp.json()})
      .then(data => {
        data.photos.forEach(element => {
          this.fotos.push(element)
        });
        this.dataPaginas(1)
        this.dialog = false
      });
    },

    abrirImagem(f){
      let fotoGrande = document.querySelector(".fotoGrande")
      fotoGrande.setAttribute("src", f)
      this.dialog = true
    },
    
    totalDePaginas() {
      return Math.ceil(this.fotos.length / this.fotosPorPagina)
    },
    
    dataPaginas(indexPagina) {
      this.paginaAtual = indexPagina,
      this.fotosPaginados = [];
      let inicioIndex = (indexPagina * this.fotosPorPagina) - this.fotosPorPagina ;
      let fimIndex = (indexPagina * this.fotosPorPagina)
      this.fotosPaginados = this.fotos.slice(inicioIndex,fimIndex)
    },
    
    paginaAnterior() {
      if (this.paginaAtual > 1) {
        this.paginaAtual--;
      }
      this.dataPaginas(this.paginaAtual)
    },
    
    paginaPosterior() {
      if (this.paginaAtual < this.totalDePaginas()) {
        this.paginaAtual++;
      }
      this.dataPaginas(this.paginaAtual)
    },
    
    ativo(indexPagina) {
      return indexPagina == this.paginaAtual ? "active" : ""
    },
    
    preLoad() {
      setTimeout(function() {
        let preLoader = document.querySelector(".preLoade")
        preLoader.style.opacity = "0"
        preLoader.style.zIndex = "-10"
      }, 4000)
    },
    
    favorito(f) {
      let dev = this.favoritos.filter(i => i.id == f.id)
      if (dev.length == 0) {
        this.favoritos.push(f)
        this.text = "Adicionado aos favoritos :)"
        this.snackbar = true
      }else {
        this.favoritos = this.favoritos.filter(i => i.id != f.id);
        this.text = "Removido dos favoritos :( "
        this.snackbar = true
      }
    },

    section1T() {
      this.section1 = true
      this.section2 = false
    },
    
    section2T() {
      this.section1 = false
      this.section2 = true
    },
  },

  created() {
    this.preLoad()
  },
  
  mounted() {
    this.fetchImagens()
  },
})

// Verificando pageYOffset
document.addEventListener("scroll", function() {
  var posicaoy = window.pageYOffset;
  if (posicaoy > 300) vm.voltarTopo = true
  else vm.voltarTopo = false
});

