var data = {
  component_estudiantes : null,
  component_preinscritos : null,
  component_preinscripcion : null,
  component_pensum_module : null,
  component_modal_add_pensum : null,
  component_persecuencia : null,
  component_horario_module : null,
  component_set_task : null
}

Vue.config.silent = false;
Vue.config.devtools = true

Vue.component('form-register',
{
  template:`
  <div class="row">
    <center>
      <div style="background:#498dba;opacity:0.8;margin-top:2%;" class="col-xs-12 col-sm-12 col-md-6 col-lg-6 transbox">
      <img src="`+getApiURL()+`/img/feb.png" style="width:40%; margin:auto;">
        <h1>
        <label>
            Registro de usuario
        </label>
        </h1>
        <div class="row">
          <div class="col-md-12" v-if="sponsor.user_name !== null">
            <h5><label>Patrocinador</label></h5>
            <center>
              <h3><span class="badge badge-warning">{{ sponsor.user_name }}</span></h3>
            </center>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6">
            <h5><label>Nombres</label></h5>
            <input type="text"  style="background-color: #047db7;color:#fff" :class="{'form-control' : true, 'is-invalid' : error.name }" v-model="name" placeholder=""  >
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6">
            <h5><label>Apellidos</label></h5>
            <input type="text" style="background-color: #047db7;color:#fff" :class="{'form-control' : true, 'is-invalid' : error.last_name }" v-model="last_name" placeholder=""  required>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6">
            <h5><label>Nombre de usuario</label></h5>
            <input type="text"  style="background-color: #047db7;color:#fff" :class="{'form-control' : true, 'is-invalid' : error.user_name }" v-model="user_name" placeholder=""  >
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6">
            <h5><label>Correo</label></h5>
            <input type="email" style="background-color: #047db7;color:#fff" :class="{'form-control' : true, 'is-invalid' : error.email }" v-model="email" placeholder=""  required>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-6">
            <h5><label>Contraseña</label></h5>
            <input type="password"  style="background-color: #047db7;color:#fff" :class="{'form-control' : true, 'is-invalid' : error.password }" v-model="password" required>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6">
            <h5><label>Repita la contraseña</label></h5>
            <input type="password" style="background-color: #047db7;color:#fff" :class="{'form-control' : true, 'is-invalid' : error.password_confirmation }" v-model="password_confirmation" required>
          </div>
        </div>
         <div class="col-xs-12 col-sm-12 col-md-6">
            <h5><label>Paquete</label></h5>
            <select style="background-color: #047db7;color:#fff" :class="{'custom-select' : true,'mr-sm-2' : true, 'is-invalid' : error.level_id }"  v-model="level_id" required>
              <option v-for="level in levels" v-bind:value="level.id">{{level.name+' | Valor: '+number_format(level.value,0,',','.')+' '+level.currency}}</option>
            </select>
          </div>
           <br>
          <div class="justify-content-center">
            <h5>
              <span class="badge badge-warning">
                El costo de la membresia es de 10.000 EDC.
              </span>
            </h5>
          </div>
          <br>
        <div class="row">
          <div class="col-md-12 mb-12">
            <div class="form-check form-check-inline">
              <center>
                <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="" v-model="checkbox" required>
                <label class="form-check-label" for="inlineCheckbox1"><h6>Aceptas los Terminos y Condiciones. Leer <a href="`+getApiURL()+`/admin/terminos_y_condiciones.pdf" target="_black" style="color:#fff" >Aqui</a></h6></label>
              </center>
            </div>
          </div>
        </div>
        <div class="justify-content-center">
          <div class="col-xs-12 col-sm-12 col-md-6">
            <button @click="register()" class="btn btn-lg btn-success" style="width:50%;margin-top: 1%;">Registrarme</button>
          </div>
        </div>
      </div>
    </center>
  </div>
  `,
  props:['countries','levels','sponsor'],
  data() {
    return {
      error:[],
      name : '',
      last_name : '',
      user_name : '',
      email :'',
      level_id : 1,
      password : '',
      password_confirmation : '',
      checkbox : false,
    }
  },
  mounted(){
    data.component_state = this;
  },
  methods:{
    select_gender : function(element){

        var parent = $(element.currentTarget).parent();

        // $("input[name=genero]:checked")
        parent.is('#f')? $("label#m").find('i').removeClass('checked'):$("label#f").find('i').removeClass('checked');
        parent.find('i').addClass('checked');
    },
    number_format: function(number, decimals, dec_point, thousands_point) {

      if (number == null || !isFinite(number)) {
          throw new TypeError("number is not valid");
      }

      if (!decimals) {
          var len = number.toString().split('.').length;
          decimals = len > 1 ? len : 0;
      }

      if (!dec_point) {
          dec_point = '.';
      }

      if (!thousands_point) {
          thousands_point = ',';
      }

      number = parseFloat(number).toFixed(decimals);

      number = number.replace(".", dec_point);

      var splitNum = number.split(dec_point);
      splitNum[0] = splitNum[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousands_point);
      number = splitNum.join(dec_point);

    return number;
    },
    getState : function (){
      this.states = [];
      var country = this.country;
      axios.post(getApiURL() + '/country/state/list',{country_id : country})
        .then(response => {
            this.states = response.data.data;
        })
        .catch(error => {
          //console.log(error);
        });
    },
    register : function () {

    Swal.showLoading();

    if (this.password != this.password_confirmation) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        onOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
        Toast.fire({
          icon: 'error',
          title:  "La Contraseña no coincide"
        });
      return;
    }
      const data = {
        name : this.name,
        last_name : this.last_name,
        user_name : this.user_name,
        email :this.email,
        referer_key : this.sponsor.referer_key,
        level_id : this.level_id,
        password: this.password
      };

        if(!this.checkbox){
          Swal.fire({
            width: 650,
            icon: 'error',
            title: 'Acepte los terminos y condiciones antes de registrar'
          });
          return;
        }

        axios.post(getApiURL() + '/register', data)
        .then(response => {
          //console.log(response.data)
            if(response.data.response == 'OK'){
             Swal.fire({
                width: 650,
                icon:  'success',
                title: 'Registro exitoso, por favor iniciar sesión para proseguir con el pago',
              });
              window.location.href = getApiURL() + '/login';
            }else{
              Swal.fire({
                width: 650,
                icon: 'error',
                title: 'Error al registrar el usuario'
              });
            }
         })
        .catch(error => {
          //console.log(error.response);
          if (typeof error.response.data.error.status_code) {
            if(error.response.data.error.status_code == 422){
                var error = error.response.data.error.message;
                var message_error = '';
                $.each(error, function( key, value ) {
                  message_error += value+'<br>';
                  error[key] = value;
                });
              this.error = [];
              this.error = error;
              Swal.fire({
                width: 650,
                icon: 'error',
                title: 'Error en el formulario',
                html: message_error,
              });
            }
          }
        });
     }
  }
});

Vue.component('panel',
{
  template:`
  <div class="card-body">
    <div class="row">
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <div class="card card-transparent" style="color: #0d2e41!important; min-height: 18.5rem;">
          <div class="card-body">
            <center>
              <h4 class="card-title">
                <label>
                  Productos
                </label>
              </h4>
            </center>
            <div class="card card-transparent" style="margin-bottom: 10px; margin-left: auto !important; margin-right: auto !important; min-width: 9rem;">
              <div class="card-body">
                <h6 class="card-title" style="margin:0;">
                  Membresia publicitaria
                  <i class="fa fa-bullhorn" aria-hidden="true"></i>
                </h6>
              </div>
            </div>
            <div class="row">
              <div v-for="product in products" class="card card-transparent" style="margin-bottom: 10px; margin-left: auto !important; margin-right: auto !important; min-width: 9rem;">
                <div class="card-body" style="padding: 5px!important;">
                  <h6 class="card-title" style="margin:0;">{{ product.name }}
                  <img :src="'`+getApiURL()+`/img/20x20_'+product.img" style="float:right;" alt="...">
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <div class="card card-transparent" style="color: #0d2e41!important; min-height: 18.5rem;">
          <div class="card-body">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <img :src="'`+getApiURL()+`/img/logo.png'" style="width: 85%!important; height: 180px;" alt="...">
              <h4>
                <label>
                  Link de referido:
                </label>
              </h4>
              <div style="margin-top: -2%;" class="input-group mb-3">
                <input disabled type="text" class="form-control" aria-describedby="refer_url" v-bind:value="'`+getApiURL()+`/register/'+user.referer_key">
                <div class="input-group-append">
                  <button id="refer_url" class="btn btn-success" v-bind:data-clipboard-text="'`+getApiURL()+`/register/'+user.referer_key">Copiar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="monthly_alert <= 7" class="row">
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-top: 1%;">
            <div class="alert" style="background: #ff2d55; margin: 0;">
                <center>
                    <h5 style="margin: 0 0 5px 0;">Fecha de mensualidad:</h5>
                    <h5 style="margin: 0 0 0 0;">{{new Date(new Date(monthly_member).setDate(new Date(monthly_member).getDate() + 1)).toLocaleDateString() }}</h5>
                    <h6 style="margin: 0;">Información para pago de membresia presione <button type="button" data-toggle="modal" data-target="#member-modal"  class="btn btn-info btn-xs">Aqui</button></h6>
                </center>
            </div>
        </div>
    </div>
  </div>
  `,
  props: ['level','monthly_member','user'],
  data: function(){
    return {
        monthly_alert : 0,
        products : {}
    }
  },
  mounted(){
    this.monthly_pay();
    this.get_products();
    data.component_level_panel = this;
  },
  methods:{
    get_products : function () {
      axios.get(getApiURL()+'/get_levels')
       .then(response => {
         this.products = response.data.data;
       })
       .catch(error => {
        alert("Ha ocurrido un error")
        //console.log(error);
      });
    },
    monthly_pay : function(){
      let monthly_date = moment(this.monthly_member);
      let today = moment()

      this.monthly_alert = moment(monthly_date, "DD-MM-YYYY").diff(today, 'days')
      if(this.monthly_alert <0){
        this.monthly_alert  = this.monthly_alert *(-1)
      }
    }
  }

});

Vue.component('solvent-user-panel',
{
  template:`
  <div :style="Styles.marginTop">
    <center>
      <h3 style="margin-top: 0px;">
        <label>
          Consulta de usuarios activos
        </label>
      </h3>
    </center>
    <div class="row">
      <div class="col-md-12 col-sm-12 col-lg-12">
        <div class="card text-white" style="background:#3f4052; margin-right: auto!important; margin-left: auto!important; max-width: 60%;">
          <div class="card-body">
            <div class="row">
              <div class="col-md-3 col-sm-12 col-lg-12">
                <h5>
                  <label>
                    Busqueda
                  </label>
                </h5>
              </div>
            </div>
            <div class="row" :style="Styles.marginBottom">
              <div class="col-md-5 col-sm-12 col-lg-12">
                <input type="text" class="form-control" id="solvent_user" placeholder="Ingrese el usuario o correo" name="name" v-model="filtro">
              </div>
              <div class="col-md-4 col-sm-12 col-lg-12">
                <button type="button" class="btn btn-primary" @click="get_user()">Consultar usuario</button>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12 col-sm-12 col-lg-12">
                <div v-if="user.name" :style="Styles.marginBottom" class="card bg-info mb-3" style="color: white; margin-right: auto!important; margin-left: auto!important; max-width: 18rem;">
                  <div class="card-header">Usuario encontrado</div>
                  <div class="card-body">
                    <center>
                      <img :src="'`+getApiURL()+`/'+imagen" style="border:3px solid #fff ; border-radius:50%; height:150px; width:150px;">
                      <h4 class="card-title">
                        {{ user.user_name }}
                        <br>
                        <small class="text-muted">
                          {{ user.name+' '+user.last_name }}
                        </small>
                      </h4>
                    </center>
                  </div>
                  <center>
                    <button type="button" class="col-12 btn btn-success" @click="confirm_pay(user.id)">Renovar</button>
                  </center>
                </div>
                <div v-else :style="Styles.marginBottom" class="card bg-secondary mb-3" style="color: white; margin-right: auto!important; margin-left: auto!important; max-width: 18rem;">
                  <div class="card-header">Realice la consulta...</div>
                  <div class="card-body">
                    <center>
                      <h4 class="card-title">
                        <p class="card-text">
                          El usuario si existe aparecera aqui
                        </p>
                      </h4>
                    </center>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `,
  data() {
    return {
      Styles : {
        middleAlign : {
          'vertical-align': 'middle'
        },
        marginBottom : {
          'margin-bottom' : '15px'
        },
        marginTop : {
          'margin-top' : '15px'
        },
        scrollX : {
          'overflow-x' : 'auto',
          'white-space' : 'nowrap'
        }
      },
      filtro : '',
      user : {},
      imagen : 'img/user.png'
    }
  },
  created() {
    data.component_solvent_user_panel = this;
  },
  methods:{
    get_user : function() {
      axios.post(getApiURL()+'/get_solvent_user',{
        user : this.filtro
      })
      .then(response => {
        if(response.data.data.length != 0){
          this.user = response.data.data;
          this.imagen = 'img/profiles/'+this.user.imagen;
          //console.log(response.data.data);
        }else{

          const Toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 5000,
            timerProgressBar: true,
            onOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })

          Toast.fire({
            icon: 'error',
            title:  "Usuario no encontrado"
          })
        }
      })
      .catch(error => {
        alert("Ha ocurrido un error")
        //console.log(error);
      });
    },
    confirm_pay : function(user){

      Swal.fire({
        width: 600,
        icon: 'info',
        html: 'Confirmar pago de mensualidad de:<br><h2>\n'+this.user.name+' '+this.user.last_name+'</h2>',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return axios.put(getApiURL()+'/confirm_monthly', {
            user_id : user
          })
          .then(response => {
            if (response.status != '200') {
              throw new Error(response.statusText)
            }
            return response.data.data;
          })
         .catch(error => {
           Swal.showValidationMessage(
             `Request fail: ${error}`
           )
         });
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then(result => {
          if(result.value){
            Swal.fire({
              width: 650,
              icon: 'success',
              timer: 2000,
              title: 'Fecha de mensualidad actualizada.'
            })
            this.user = {}
          }
      })
    }
  }
});

Vue.component('insolvents-users-panel',
{
  template:`
  <div :style="Styles.marginTop">
    <center>
      <h3 style="margin-top: 0px;">
        <label>
          Lista de usuarios inactivos
        </label>
      </h3>
    </center>
    <div class="row">
      <div class="col-md-12 col-sm-12 col-lg-12">
        <div class="card" style="background:#3f4052;">
          <div class="table-responsive">
            <table class="table table-striped table-hover">
              <thead class="text-white">
                <tr>
                  <th>
                    Usuario
                  </th>
                  <th>
                    Nombre del usuario
                  </th>
                  <th>
                    Fecha de vencimiento
                  </th>
                  <th>
                  </th>
                </tr>
              </thead>
              <paginate name="insolvents" :list="insolvents" :per="5" tag="tbody">
                <tr v-if="insolvents.length == 0" class="text-white">
                  <td :style="Styles.middleAlign" colspan="4">
                    <center>
                      <h4 style="margin: 0;">
                        <label style="margin: 0;">
                          Sin registros
                        </label>
                      </h4>
                    </center>
                  </td>
                </tr>
                <tr class="text-white" v-for="insolvent in paginated('insolvents')">
                  <td :style="Styles.middleAlign">
                    {{ insolvent.user_name }}
                  </td>
                  <td :style="Styles.middleAlign">
                    {{ insolvent.name+' '+insolvent.last_name }}
                  </td>
                  <td :style="Styles.middleAlign">
                    {{ new Date(insolvent.monthly_member).toLocaleDateString('es-ES') }}
                  </td>
                  <td class="text-center">
                    <button type="button" class="btn btn-primary btn-sm" @click="reactivate(insolvent)"><strong>Reactivar</strong></button>
                  </td>
                </tr>
              </paginate>
            </table>
            <paginate-links for="insolvents" :limit="5" :show-step-links="true" :classes="{'ul': 'pagination', 'li': 'page-item', 'a': 'page-link'}"></paginate-links>
          </div>
        </div>
      </div>
    </div>
  </div>
`,
  data() {
    return {
      Styles : {
        middleAlign : {
          'vertical-align': 'middle'
        },
        marginBottom : {
          'margin-bottom' : '15px'
        },
        marginTop : {
          'margin-top' : '15px'
        },
        scrollX : {
          'overflow-x' : 'auto',
          'white-space' : 'nowrap'
        }
      },
      insolvents : [],
      paginate : ['insolvents'],
      filtro : ''
    }
  },
  computed: {
    tablefilter: function() {
      return this.insolvents.filter(insolvent => {
        return this.buscarEnObjeto(insolvent, this.filtro.toLowerCase());
      });
    }
  },
  created() {
    this.get_insolvents_users();
    data.component_insolvents_users_panel = this;
  },
  methods:{
     buscarEnObjeto(objeto, input_text){

      for (let key in objeto) {
        if (objeto.hasOwnProperty(key) && objeto[key].toString().toLowerCase().includes(input_text) ) {
          return true;
        }
      }
      return false;
    },
    get_insolvents_users : function() {
      axios.get(getApiURL()+'/get_insolvents_users')
      .then(response => {
        this.insolvents = response.data.data;
        ////console.log(response.data.data);
      })
      .catch(error => {
        alert("Ha ocurrido un error")
        //console.log(error);
      });
    },
    reactivate : function(insolvent_user){

      Swal.fire({
        width: 600,
        title: 'Confirmación',
        icon: 'info',
        text: 'El usuario '+insolvent_user.user_name+' sera reactivado.',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return axios.put(getApiURL()+'/confirm_monthly', {
            user_id : insolvent_user.id
          })
          .then(response => {
            if (response.status != '200') {
              throw new Error(response.statusText)
            }
            return response.data.data;
          })
         .catch(error => {
           Swal.showValidationMessage(
             `Request fail: ${error}`
           )
         });
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then(result => {
          if(result.value){
            Swal.fire({
              width: 650,
              icon: 'success',
              timer: 3000,
              title: 'Usuario reactivado y su mensualidad actualizada.'
            })

            this.get_insolvents_users();
          }
      })
    }
  }
});

Vue.component('red-panel',
{
  template:`
  <div class="card text-white mb-3" style="background:#3f4052; margin-bottom: 15px; min-height: 13rem;">
    <div class="card-body">
      <center>
        <h4 class="card-title">
          <label>
            Mi red
          </label>
        </h4>
      </center>
      <div class="row">
        <div class="card card-transparent" style="margin-bottom: 10px; margin-left: auto !important; margin-right: auto !important; min-width: 9rem;">
          <div class="card-body" style="background:#2b698d;">
            <center>
              <h5 class="card-title" style="margin:0;">Directos</h5>
              <h4 class="card-title" style="margin:0;">
                <label style="margin:0;">
                  {{ directs.length }}
                </label>
              </h4>
            </center>
          </div>
        </div>
      </div>
    </div>
  </div>
  `,
  props: ['directs'],
  data: function(){
    return {
      earning_balance : this.balance
    }
  },
  mounted(){

    //this.get_balance();
    data.component_balance_panel = this;
  },
  methods:{
    get_balance : function(){
      axios.post(getApiURL()+'get_balance')
      .then(response => {
        this.earning_balance = response.data.balance
        //this.get_achieves_win()
      })
      .catch(error => {
        alert("Ha ocurrido un error")
        //console.log(error);
      });
    }
  }
});

Vue.component('withdrawal-panel',
{
  template:`
  <div class="card text-white mb-3" style="background:#3f4052; margin-bottom: 15px; min-height: 13rem;">
    <div class="card-body">
      <center>
        <h4 class="card-title">
          <label>
            Retirar
          </label>
        </h4>
      </center>
      <div class="row">
        <div class="card card-transparent" style="margin-bottom: 10px; margin-left: auto !important; margin-right: auto !important; min-width: 9rem;">
          <div class="card-body" style="background: #2b698d;">
            <center>
              <h5 class="card-title" style="margin:0;">Balance disponible</h5>
              <h4 class="card-title" style="margin:0;">
                <label style="margin:0;">
                  <i class="fa fa-money" aria-hidden="true"></i> {{ balance.toLocaleString('de-DE') }} EDC
                </label>
              </h4>
            </center>
          </div>
        </div>
        <div class="card card-transparent" style="margin-bottom: 10px; margin-left: auto !important; margin-right: auto !important; min-width: 9rem;">
          <div class="card-body" style="background: #2b698d;">
            <center>
              <h5 class="card-title" style="margin:0;">Balance bloqueado</h5>
              <h4 class="card-title" style="margin:0;">
                <label style="margin:0;">
                  <i class="fa fa-money" aria-hidden="true"></i> {{ sum_lock_balance.toLocaleString('de-DE') }} EDC
                </label>
              </h4>
            </center>
          </div>
        </div>
      </div>
    </div>
  </div>`,
  props: ['balance','sum_lock_balance','group_lock_balance'],
  data(){
    return{
      monthly_alert : false,
      text_lock_balance : ''
    }
  },
  mounted(){
    //this.monthly_pay()
   // console.log(this.group_lock_balance);
    var text = '';
    $.each(this.group_lock_balance, function( key, value ) {
      text += ' Nivel '+value.level_id+' Monto: '+value.mount+'. ';
    });
    data.component_plan_panel = this;
    this.text_lock_balance = text;
  },
  methods:{
  }
});

Vue.component('profile-imagen',
{
  template:`
  <div class="text-center">
    <div :style="Styles.imagen" class="avatar img-circle img-thumbnail">
    </div>
    <h4>
      <label>
        Cambiar imagen de perfil
      </label>
    </h4>
    <form method="post" action="" enctype="multipart/form-data">
      <input type="file"  id="file-input" name="file-input" accept="image/*" @change="updateProfileImagen" class="text-center center-block file-upload">
    </form>
  </div>`,
 props:['user'],
 data() {
    return {
          Styles : {
            imagen:{
            'padding': "20px",
            'margin' : 'auto',
            'background-image' :'url('+getApiURL()+'/img/profiles/'+this.user.imagen+')',
            'background-size' : ' 100% auto',
            'border-radius' : '5px;',
            'width':'250px',
            'height':'250px',
            'border-radius':'50%',
            },
          },
       }
  },
  created(){

  },
  methods:{
    updateProfileImagen : function (event = null){

         Swal.showLoading();
        var formData = new FormData();
        formData.append('image',$('#file-input')[0].files[0]);
        formData.append('user_id',this.user.id);

        axios.post(
          getApiURL() + '/image',
          formData,
          {
            'Content-Type': 'multipart/form-data'
        })
        .then(response => {
          location.reload();
        })
        .catch(error => {

          let message = error.response.data.error.message;

          Swal.fire({
            position: 'bottom',
            toast: true,
            timer: 4000,
            timerProgressBar: true,
            icon: 'error',
            text: message
          })
          // alert("Ha ocurrido un error");
        });
      }
    }
});
// lo quite por prueba "@click="$emit('get_selected_state', selected_state)"
Vue.component('location-selects',
{
  template:`
  <div class="row">
    <div  class="col-md-6 mb-3">
      <h6><label>Pais</label></h6>
      <select id="country" name="country" v-model="country" class="form-control" v-on:change="getState()">
       <option>Seleccione</option>
        <option v-for="country in countries" v-bind:value="country.id">{{ country.name }}</option>
      </select>
    </div>
    <div class="col-md-6 mb-3">
      <h6><label>Estado o Provincia</label></h6>
      <select id="state" v-model="state" name="state" class="form-control">
        <option>Seleccione</option>
        <option v-for="state in states" v-bind:value="state.id">{{state.name}}</option>
      </select>
    </div>
  </div>
  `,
  props :['selected_country','selected_state'],
  data() {
    return {
      countries: [],
      states: [
        {name : 'Seleccione'}
      ],
      loading: false,
      state : null,
      country : null
    }
  },
  created(){
    this.country = null;
    this.state = null;
    this.getCountries();
    data.component_location_selects = this;
  },
  methods :{
    getCountries : function (){

      axios.post(getApiURL()+'/country/list')
      .then(response => {
          this.countries = response.data.data;
      })
      .catch(error => {

      }).finally(() => {
        var country = this.selected_country;
        this.country = country;
        this.getState();
      });
    },
    getState : function(evento = null){

      this.states = [];
      axios.post(getApiURL()+'/country/state/list',{
          country_id : this.country
      })
      .then(response => {
          this.states = response.data.data;
      })
      .catch(error => {

      }).finally(() => {
        var state = this.selected_state;
        this.state = state;
      });
    }
  }
});


Vue.component('profile-data',
{
  template:
  `
  <div>
    <div class="row">
      <div class="col-md-6 mb-6">
        <label>Nombres</label>
        <input type="text" class="form-control" v-model="user.name"  placeholder="" required>
      </div>
      <div class="col-md-6 mb-6">
        <label>Apellidos</label>
        <input type="text" class="form-control" v-model="user.last_name" placeholder=""  required>
      </div>
      <div class="col-md-6 mb-6">
        <label>Usuario</label>
        <input type="text" class="form-control" v-model="user.user_name" placeholder="" readonly>
      </div>
          <div class="col-md-6 mb-6">
        <label>Correo</label>
        <input type="email" class="form-control" v-model="user.email" placeholder=""  readonly>
      </div>
      <div class="col-md-6 mb-6" hidden>
        <label>Numero de Telefono Fijo</label>
        <input type="number" class="form-control" v-model="user.landline" placeholder="" value="0">
      </div>
      <div class="col-md-6 mb-6">
        <label>Numero de Telefono Celular</label>
        <input type="number" class="form-control" v-model="user.phone" placeholder="" required>
      </div>
      <div class="col-md-6 mb-6">
        <label for="inlineFormCustomSelect">Genero</label>
        <select class="custom-select mr-sm-2" v-model="user.gener">
          <option value="M">Hombre</option>
          <option value="F">Mujer</option>
          <option value="otro">Otro</option>
        </select>
      </div>
      <div class="col-md-3 mb-3">
        <label for="inlineFormCustomSelect">Tipo</label>
        <select class="custom-select mr-sm-2"  v-model="user.type_document"  :disabled="user.type_document != null" required>
          <option value="CC">CC</option>
          <option value="Pasaporte">Pasaporte</option>
          <option value="CE">CE</option>
          <option value="NIT">NIT</option>
        </select>
      </div>
      <div class="col-md-3 mb-3">
        <label>Numero de Documento</label>
        <input type="number" class="form-control" v-model="user.dni"  :disabled="user.dni != null" required>
      </div>
      <div class="col-md-6 mb-6">
        <label>Fecha de nacimiento</label>
        <input type="date" class="form-control" v-model="user.birthdate">
      </div>
      <div class="col-md-12 mb-12">
        <label>Direccion</label>
        <input type="text" class="form-control" v-model="user.direction">
      </div>
      <div class="col-md-12 mb-12">
        <label>Wallet EDC BLOCKCHAIN</label>
        <input type="text" class="form-control" v-model="user.wallet_edc_blockchain" placeholder=""  >
      </div>
    </div>
      <location-selects v-on:get_selected_state="user.state_id = $event" v-bind:selected_country="country.id" v-bind:selected_state="state.id"></location-selects>
    <div class="row">
      <div class="col-md-12 mb-12">
        <label>Link para refiridos</label>
        <input type="text" class="form-control" v-model="referer_key" readonly>
      </div>
      <div v-if="!confirm" class="col-md-12 mb-12"><br>
        <button type="submit" class="btn btn-success" @click="update_profile()">Actualizar</button>
      </div>
      <div v-else class="col-md-12 mb-12"><br>
        <button type="submit" class="btn btn-success" @click="update_profile(true)">Confirmar Modificación</button>
      </div>
      </form>
      </div>
    </div>
 </div><!--/tab-pane-->
</div>

 `,
 props:{
  user:{},
  state : {},
  country : {},
  confirm : {}
 },
 data() {
    return {
      referer_key : getApiURL()+'/register/'+this.user.referer_key
    }
  },
  created(){
  },
  methods:{
    update_profile : function(){
      Swal.showLoading();
      axios.put(getApiURL() + '/update_profile', {user : this.user , confirm : this.confirm})
      .then(response => {
        if(this.confirm){
          Swal.fire({
            icon: 'success',
            width: 650,
            title:  "Modificación exitosa"
          });
        }else{
          Swal.fire({
            icon: 'success',
            width: 650,
            title:  "Se ha enviado un correo electrónico para confirma los cambios de datos de su perfil"
          });
        }

        this.user = response.data.data;
      })
      .catch(error => {

        Swal.fire({
              width: 650,
              icon: 'error',
              title: 'Complete los datos faltantes'
          })
      });
    }
  }
});


Vue.component('profile-password',
{
  template:
  `<div>
  <div class="row">
    <div class="col-md-12 mb-12">
      <h4><label>Contraseña Actual</label></h4>
      <input type="password" class="form-control" v-model="password_old" placeholder="Ingrese Contraseña Actual"  >
    </div>
    <div class="col-md-6 mb-6">
      <h4><label>Nueva Contrase&ntilde;a</label></h4>
      <input type="password" class="form-control" v-model="password" placeholder="Ingrese Contraseña Nueva">
    </div>
      <div class="col-md-6 mb-6">
      <h4><label>Confirmaci&oacute;n</label></h4>
      <input type="password" class="form-control" v-model="password_confirmation" placeholder="Repite la Contraseña Nueva" >
    </div>

    <br>
    <div class="col-md-12 mb-12"><br>
      <button type="submit" class="btn btn-success" @click="update_password" >Actualizar</button>
    </div>
    </div>
  </div>

 `,
 props:['user'],
 data() {
    return {
          password_old : null,
          password_confirmation : null,
          password : null
      }
  },
  created(){

  },
  methods:{
    update_password : function(){
      if(this.password == this.password_confirmation){
        Swal.showLoading();
        axios.put(getApiURL() + '/update_password', {password : this.password, password_old: this.password_old})
        .then(response => {


              Swal.fire({
                icon: 'success',
                width: 650,
                title:  "Cambio de Contraseña exitosa"
              });

        })
        .catch(error => {
            if(error.response.data.error.status_code == 422){

               Swal.fire({
                icon: 'error',
                width: 650,
                title:  "Contraseña actual incorrecta"
              });

            }else{
              Swal.fire({
                width: 650,
                icon: 'error',
                title: 'Error al cambiar la Contraseña'
              })
            }

        });
      }else{
        Swal.fire({
          width: 650,
          icon: 'error',
          title: 'Contraseña no coincide'
        })
      }
    }
  }
});

Vue.component('upload-panel',
{
  template:`
  <div class="card-body">
    <div class="row" :style="Styles.marginBottom">
      <div class="col-sm-12 col-md-12 col-lg-12">
        <center>
          <button data-toggle="modal" data-target="#upload-modal" class="btn btn-primary">+ Subir Archivo</button>
        </center>
      </div>
    </div>
    <div class="row">
      <div v-for="(promotion_file,key) in promotion_files" :style="Styles.marginBottom" class="card bg-info mb-3" style="color: white;background: #2b698d !important; margin-right: auto!important; margin-left: auto!important; width: 34rem;">
        <div class="card-header">
          <h4>
            {{promotion_file.promotion.description}}
            <button style="float:right;" type="button" class="btn btn-danger btn-sm"  aria-label="Close" @click="deleteFile(promotion_file.id)" title="">
              Eliminar
              <span aria-hidden="true">&times;</span>
            </button>
          </h4>
        </div>
        <div class="card-body">
           <object style="border: solid 2px white; border-radius: 2%;" :data="'`+getApiURL()+`/promotion_files/'+promotion_file.file+'#view=Fit'" width="100%" height="500px">
           </object>
        </div>
      </div>
    </div>
  </div>`,
  data() {
    return {
      Styles : {
        marginBottom : {
          'margin-bottom' : '15px'
        },
        progress : 0
      },
      promotion_files : {},
      editing : []
    }
  },
  created(){
    data.component_panel_upload = this;
    this.get_promotion_file();
  },
  methods:{
    get_promotion_file : function () {
      axios.get(getApiURL()+'/get_promotion_file')
       .then(response => {
         this.promotion_files = response.data.data;
       })
       .catch(error => {
        alert("Ha ocurrido un error")
        //console.log(error);
      });
    },
    deleteFile: function(id){

      Swal.fire({
        width: 600,
        title: 'Confirmación',
        icon: 'warning',
        text: 'Esta a punto de eliminar este archivo de promoción',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return axios.delete(getApiURL()+'/delete_file_promotion/'+id)
          .then(response => {
            if (response.status != '200') {
              throw new Error(response.statusText)
            }
            return response.data.data;
          })
          .catch(error => {
            //console.log(error.status )
            if(error.response.data.error.status_code == '422'){
              Swal.showValidationMessage(
                 `${error.response.data.error.message.error}`
               )
            }else{
                Swal.showValidationMessage(
                 `Request fail: ${error}`
               )
            }
         });
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then(result => {
        if(result.value){
           Swal.fire({
            width: 650,
            icon: 'success',
            title: 'Archivo de promoción eliminado exitosamente'
          })
          this.get_promotion_file();
        }
      });
    }
  }
});

Vue.component('upload-modal',
{
  template:`
  <div class="modal fade" id="upload-modal">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title" style="margin: 0;">
            Subir Archivo
          </h4>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-12">
              <h4 style="margin:0;">
                <label>
                  Ingrese descripción
                </label>
              </h4>
            </div>
          </div>
          <div class="row">
            <div class="col-8">
              <input type="text" class="form-control col-7" v-model="description" placeholder="Descripción de promoción">
            </div>
            <div class="col-4">
              <button class="btn btn-primary" style="float: right;" @click="updateFile()">Cargar Archivo</button>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <div class="card bg-light mb-3">
                <div class="card-header">
                  <h5 style="margin: 0;">
                    <label style="margin: 0;">
                      Archivo
                    </label>
                  </h5>
                </div>
                <div class="card-body">
                  <input id="file-input" name="file-input" type="file"  ref="files"  @change="getFile()" style="display: none" />
                  <div class="col-lg-12 col-md-12 col-sm-12">
                    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                      <ol class="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" class="bg-info" v-for="(file,index) in files" v-bind:data-slide-to="index" v-bind:class="index == 0? 'active':null"></li>
                      </ol>
                      <div class="carousel-inner">
                        <div v-for="(file,index) in files" v-bind:class="index == 0? 'active':null" class="carousel-item">
                          <div v-if="file.type.split('/')[0] == 'image'">
                            <div class="row" style="margin-bottom: 5px;">
                              <div class="col-12">
                                <div class="form-inline">
                                  <div class="form-group mb-2">
                                    <h5 style="margin:0;">
                                      <label style="margin:0;">
                                        <i class="icon-file"></i>
                                        <b>{{file.name}}</b>
                                      </label>
                                    </h5>
                                    &nbsp;
                                    <button type="button" class="btn btn-danger btn-sm"  aria-label="Close" @click="DeleteFile(index)" title="">
                                      Remover
                                      <span aria-hidden="true">&times;</span>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-12">
                                <img style="border: solid 2px black; border-radius: 1%;" :src="file.url" height="500px" width="100%">
                              </div>
                            </div>
                          </div>
                          <div v-else-if="file.type == 'application/pdf' && file.name.split('.')[1] == 'pdf'">
                            <div class="row">
                              <div class="col-12">
                                <object :data="file.url+'#view=Fit'" width="100%" height="500">
                                </object>
                              </div>
                            </div>
                            <div class="row" style="margin-top: 5px;">
                              <div class="col-6">
                                <h5 style="margin:0;">
                                  <label style="margin:0;">
                                    <i class="icon-file"></i>
                                    <b>{{file.name}}</b>
                                  </label>
                                </h5>
                              </div>
                              <div class="col-6">
                                <button type="button" class="btn btn-danger btn-sm" style="float: right;"  aria-label="Close" @click="DeleteFile(index)" title="">
                                  Remover Archivo
                                  <span aria-hidden="true">&times;</span>
                                </button>
                              </div>
                            </div>
                          </div>
                          <div v-else>
                            <div class="row">
                              <div class="col-12">
                                <div style="height: 500px; width: 100%; border: solid 2px black; border-radius: 1%;">
                                  <div style="margin-left: 45%!important;margin-top: 36%!important;">
                                    <i class="icon-file-text icon-4x"></i>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="row" style="margin-top: 5px;">
                              <div class="col-6">
                                <h5 style="margin:0;">
                                  <label style="margin:0;">
                                    <i class="icon-file"></i>
                                    <b>{{file.name}}</b>
                                  </label>
                                </h5>
                              </div>
                              <div class="col-6">
                                <button type="button" class="btn btn-danger btn-sm" style="float: right;"  aria-label="Close" @click="DeleteFile(index)" title="">
                                  Remover Archivo
                                  <span aria-hidden="true">&times;</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <a v-if="files.length > 1" class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon bg-info" style="padding: 15px; border-radius: 35%;" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                      </a>
                      <a v-if="files.length > 1" class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                        <span class="carousel-control-next-icon bg-info" style="padding: 15px; border-radius: 35%;" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                      </a>
                      <center v-if="files.length == 0">
                        <h2>
                          <label>
                            No ha cargado ningun archivo
                          </label>
                        </h2>
                      </center>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
            <button  type="button" class="btn btn-primary" @click="updateFile(true)">Enviar</button>
        </div>
     </div>
   </div>
</div>`,
  data() {
    return {
      Styles : {
        marginBottom : {
          'margin-bottom' : '15px'
        },
        marginTop : {
          'margin-top' : '15px'
        },
        progress : 0
      },
      description : null,
      files:[],
      promotion_files:[]
    }
  },
  created(){
    data.component_modal_upload = this;
  },
  methods:{
    updateFile : function (event = null){
      if(event==null){
        $('#file-input').click();
      }else{
        if(this.description == null){
          Swal.fire({
            width: 650,
            icon: 'error',
            title: 'Por favor llenar el campo descripcion'
          });
          return;
        }
        var formData = new FormData();

        Swal.showLoading();

        formData.append('description',this.description);
        for(var i = 0; i < this.promotion_files.length; i++ ){
         formData.append('file_'+i,this.promotion_files[i])

        }

        axios.post(
        getApiURL() + '/upload_file',
        formData,
        {
          'Content-Type': 'multipart/form-data'
        })
        .then(response => {
          Swal.fire({
            width: 650,
            icon: 'success',
            title: 'Archivo subido exitosamente'
          })
          $("#upload-modal").modal('hide');
          data.component_panel_upload.get_promotion_file();
        })
        .catch(error => {
          let message = error.response.data.error.message;
          Swal.fire({
            position: 'bottom',
            toast: true,
            timer: 4000,
            timerProgressBar: true,
            icon: 'error',
            text: message
          })
          // alert("Ha ocurrido un error");
        });
      }
    },
    getFile: function(){
      //console.log("Hola "+this.$refs.files.files.length);
      for(var i = 0; i < this.$refs.files.files.length; i++ ){
        this.promotion_files.push(this.$refs.files.files[i]);
        this.files.push({
          name: this.$refs.files.files[i].name,
          type: this.$refs.files.files[i].type,
          url : URL.createObjectURL(this.$refs.files.files[i])
        });
      }
    },
    DeleteFile: function(index){
      this.files.splice(index, 1);
      this.promotion_files.splice(index, 1);
      $(".carousel-item").eq(0).addClass('active');
    }
  }
});


Vue.component('level-graphic',
{
  template:
  `

  <center>
  <div class="fnd col-md-6 col-sm-6">
    <img :src="'`+getApiURL()+`/img/profiles/'+user.imagen" data-id="" class="irf" style="border-radius:50%; width:80px; height:80px;"/>
    <br>
    <h6 style="margin-top: -15px;">
      <span class="badge badge-primary">{{ user.name+' '+user.last_name }}</span>
    </h6>
  </div>
    <div class="d-flex flex-nowrap" style="width: 100%; overflow-x: auto; overflow-y: auto; white-space: nowrap;">
      <div class="cell-row row-1 empty-cell" v-bind:id="direct.id" v-for="direct in directs" style="vertical-align: top; display: inline-block;">
        <center>
          <div class="content-direct" style="background-size: 100% 100%;"><center>
            <img :src="'`+getApiURL()+`/img/profiles/'+direct.imagen"  data-id="" class="irf" id="avt"></center>
          </div>
          <br>
          <br>
          <h6 style="margin-top: -15px;">
            <span class="badge badge-secondary" style="height:8%;">{{ direct.user_name }} <br> Nivel {{ direct.level_id }} <br> {{ direct.level_name }}</span>
          </h6>
        <center>
      </div>
    </div>
   <center>

 `,
 props:['user'],
 data() {
    return {
      directs : [],
    }
  },
  created(){
  this.get_direct();
  },
  methods:{
   get_direct : function(){
      axios.get(getApiURL()+'/get_direct')
      .then(response => {
         this.directs = response.data.data;
       })
      .catch(error => {
        alert("Ha ocurrido un error")
        //console.log(error);
      }).finally(() => {

      });
    }
  }
});

Vue.component('retirement',
{
  template:`
  <div>
    <h1 class="display-4">Retiros</h1>
    <hr>
    <div class="row">
      <div class="col-md-6 col-sm-6 col-lg-6">
        <center>
          <h3 style="margin-top: 0px;">
            <label>
              Solicitar
            </label>
          </h3>
        </center>
        <div class="card text-white" style="background:#3f4052; min-height: 14rem;">
          <div class="card-body">
            <div  :style="Styles.marginBottom" class="form-group row">
              <div class="col-md-6 col-sm-12 col-xs-12">
                <h4 style="margin: 0;">
                  <label class="col-md-12 col-sm-12 col-xs-12">
                    Balance disponible
                  </label>
                </h4>
              </div>
              <div class="col-md-5 col-sm-12 col-xs-12">
                <label>
                  <h4 style="margin: 0;">{{balance.toLocaleString('de-DE')}} EDC </h4>
                </label>
              </div>
            </div>
            <div :style="Styles.marginBottom" class="form-group row">
              <div class="col-md-6 col-sm-12 col-xs-12">
                <h5 style="margin: 0;">
                  <label class="col-md-12 col-sm-12 col-xs-12 col-form-label">
                    Monto a retirar
                  </label>
                  <small class="col-md-12 col-sm-12 col-xs-12 text-muted">Comision de retiro: 5%</small>
                </h5>
              </div>
              <div class="col-md-5 col-sm-12 col-xs-12">
                <input type="number" class="form-control" id="retirement" step="0.01" min="0" :max="balance" placeholder="Monto" name="retirement" v-model="mount_retirement">
              </div>
            </div>
            <div class="col-md-12 col-sm-12 col-xs-12">
              <center>
                <button type="button" @click="post_retirement" class="btn btn-primary">Enviar</button>
              </center>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-sm-6 col-lg-6">
        <center>
          <h3>
            <label>
              Lista de retiros
            </label>
          </h3>
        </center>
        <div class="card" style="background:#3f4052; min-height: 14rem;">
          <div class="table-responsive">
            <table class="table table-striped table-hover">
              <thead class="text-white">
                <tr>
                  <th>
                    Fecha
                  </th>
                  <th>
                    Monto
                  </th>
                  <th>
                    Estado
                  </th>
                </tr>
              </thead>
              <paginate name="retirements" :list="retirements" :per="5" tag="tbody">
                <tr class="text-white" v-if="retirements.length == 0" class="text-white">
                  <td :style="Styles.middleAlign" colspan="5">
                    <center>
                      <h4 style="margin: 0;">
                        <label style="margin: 0;">
                          Sin registros
                        </label>
                      </h4>
                    </center>
                  </td>
                </tr>
                <tr class="text-white" v-for="retirement in paginated('retirements')">
                  <td :style="Styles.middleAlign">
                    {{ retirement.created_at }}
                  </td>
                  <td :style="Styles.middleAlign">
                    {{ (retirement.mount*1).toLocaleString('de-DE') }} EDC
                  </td>
                  <td :style="Styles.middleAlign">
                    <h5 style="margin: 0;">
                      <span v-if="retirement.status == 'Pagado'" class="badge badge-pill badge-success">Pagado</span>
                      <span v-else-if="retirement.status == 'Cancelado'" class="badge badge-pill badge-secondary">Cancelado</span>
                      <span v-else class="badge badge-pill badge-warning">Pendiente</span>
                    </h5>
                  </td>
                  <td :style="Styles.middleAlign">
                    <button v-if="retirement.status == 'Pendiente'" type="button" class="btn btn-secondary btn-sm" @click="cancel_withdrawal(retirement)"><strong>Cancelar</strong></button>
                  </td>
                </tr>
              </paginate>
            </table>
            <center>
              <paginate-links for="retirements" :limit="5" :show-step-links="true" :classes="{'ul': 'pagination', 'li': 'page-item', 'a': 'page-link'}"></paginate-links>
            </center>
          </div>
        </div>
      </div>
    </div>
  </div>
  `,
  props : ['balance'],
  data() {
    return {
       Styles : {
        middleAlign : {
          'vertical-align': 'middle'
        },
        marginBottom : {
          'margin-bottom' : '15px'
        },
        scrollX : {
          'overflow-x' : 'auto',
          'white-space' : 'nowrap'
        }
      },
      retirements : [
      ],
      mount_retirement: 0,
      paginate : ['retirements'],
      filtro : ''
    }
  },
  created(){
    this.get_retirements();
  },
  computed: {
    tablefilter: function() {
      return this.retirements.filter(retirement => {
        return this.buscarEnObjeto(retirement, this.filtro.toLowerCase());
      });
    }
  },
  methods :{
    buscarEnObjeto(objeto, input_text){

      for (let key in objeto) {
        if (objeto.hasOwnProperty(key) && objeto[key].toString().toLowerCase().includes(input_text) ) {
          return true;
        }
      }
      return false;
    },
    post_retirement : function (){
      Swal.showLoading();
      axios.post(getApiURL() + '/retirement',{
        retirement : this.mount_retirement
      })
      .then(response => {
          //console.log(response.data);
          Swal.fire({
            width: 650,
            icon: 'success',
            title: 'Solicitud de retiro exitoso! Se ha enviado un correo con la confirmación de retiro'
          })
      })
      .catch(error => {
       // console.log(error.response.data.error)
        if (typeof error.response.data.error.status_code) {
          if(error.response.data.error.status_code == 422){
            let message = error.response.data.error.message;
              Swal.fire({
                width: 650,
                icon: 'error',
                title: message[0],
              })
          }
        }
      });
    },
    get_retirements : function (){
      axios.get(getApiURL() + '/get_retirement')
      .then(response => {
        this.retirements = response.data.data;
      })
      .catch(error => {
        alert("Ha ocurrido un error")
      });
    },
    cancel_withdrawal : function(withdrawal){

      Swal.fire({
        width: 600,
        title: 'Confirmación',
        icon: 'warning',
        html: '¿Esta seguro de cancelar el retiro?',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        confirmButtonColor: '#dc3545',
        showLoaderOnConfirm: true,
        preConfirm: () => {
           return axios.put(getApiURL()+'/cancel_withdrawal', {
            withdrawal_id : withdrawal.id
          })
          .then(response => {
            if (response.status != '200') {
              throw new Error(response.statusText)
            }
            return response.data.data;
          })
         .catch(error => {
           Swal.showValidationMessage(
             `Request fail: ${error}`
           )
         });
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then(result => {
          if(result.value){
            Swal.fire({
              width: 650,
              icon: 'success',
              title: ' Retiro Cancelado'
            });
            this.get_retirements();
          }
      })
    }
 }
});

Vue.component('retirement-confirm',
{
  template:`
  <div>
    <h1 class="display-4">Retiros</h1>
    <hr>
    <div class="row">
      <div class="col-md-6 col-sm-6 col-lg-6">
        <center>
          <h3 style="margin-top: 0px;">
            <label>
              Confirmación de retiro
            </label>
          </h3>
        </center>
        <div class="card text-white" style="background:#3f4052;">
          <div class="card-body">
            <div class="row">
              <div class="col-md-12 col-sm-12 col-lg-12">
                <div class="col-md-12 col-sm-12 col-xs-12">
                  <h4 style="margin: 0;"><label style="margin: 0;">Monto a retirar</label></h4>
                  <h3><label><strong>{{ (retirement.mount*1).toLocaleString('de-DE') +' EDC'}}</strong></label></h3>
                </div>
                <div class="col-md-12 col-sm-12 col-xs-12">
                  <h4 style="margin: 0;"><label style="margin: 0;">Comisión</label></h4>
                  <h3><label><strong>{{ (mount_fee*1).toLocaleString('de-DE') +' EDC' }}</strong></label></h3>
                </div>
                <div class="col-md-12 col-sm-12 col-xs-12">
                  <h4 style="margin: 0;"><label style="margin: 0;">Monto a recibir</label></h4>
                  <h3><label><strong>{{ (mount_pay*1).toLocaleString('de-DE') +' EDC' }}</strong></label></h3>
                </div>
                <div class="col-md-12 col-sm-12 col-xs-12">
                  <center>
                    <button type="button" @click="retirement_confirm" class="btn btn-success">Confirmar</button>
                  </center>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-sm-6 col-lg-6">
        <center>
          <h3 style="margin-top: 0px;">
            <label>
              Lista de retiros
            </label>
          </h3>
        </center>
        <div class="card text-white" style="background:#3f4052;">
          <div class="table-responsive">
            <table class="table table-striped table-hover">
              <thead class="text-white">
                <tr>
                  <th>
                    Fecha
                  </th>
                  <th>
                    Monto
                  </th>
                </tr>
              </thead>
              <paginate name="retirements" :list="tablefilter" :per="5" tag="tbody">
                <tr class="text-white" v-if="retirements.length == 0">
                  <td :style="Styles.middleAlign" colspan="5">
                    <center>
                      <h4 style="margin: 0;">
                        <label style="margin: 0;">
                          Sin registros
                        </label>
                      </h4>
                    </center>
                  </td>
                </tr>
                <tr class="text-white" v-for="retirement in paginated('retirements')">
                  <td :style="Styles.middleAlign">
                    {{  new Date(retirement.created_at).toLocaleDateString('es-ES') }}
                  </td>
                  <td :style="Styles.middleAlign">
                    {{retirement.mount.toLocaleString('de-DE') +' EDC' }}
                  </td>
                </tr>
              </paginate>
            </table>
            <paginate-links for="retirements" :limit="5" :show-step-links="true" :classes="{'ul': 'pagination', 'li': 'page-item', 'a': 'page-link'}"></paginate-links>
          </div>
        </div>
      </div>
    </div>
  </div>`,
  props : ['retirement'],
  data() {
    return {
      Styles : {
        middleAlign : {
          'vertical-align': 'middle'
        },
        marginBottom : {
          'margin-bottom' : '15px'
        },
        scrollX : {
          'overflow-x' : 'auto',
          'white-space' : 'nowrap'
        }
      },
      retirements : [],
      mount_retirement: 0,
      user_edc_blockchain: null,
      paginate : ['retirements'],
      filtro : '',
      fee : 0.05,
      mount_pay : 0
    }
  },
  created(){
    this.get_retirements();
    this.mount_fee = this.retirement.mount * this.fee;
    this.mount_pay = this.retirement.mount - (this.retirement.mount*this.fee);
  },
  computed: {
    tablefilter: function() {
      return this.retirements.filter(plan => {
        return this.buscarEnObjeto(retirement, this.filtro.toLowerCase());
      });
    }
  },
  methods :{
    buscarEnObjeto(objeto, input_text){
      for (let key in objeto) {
        if (objeto.hasOwnProperty(key) && objeto[key].toString().toLowerCase().includes(input_text) ) {
          return true;
        }
      }
      return false;
    },
    retirement_confirm : function (){
      /*if(this.user_edc_blockchain == null){
        Swal.fire({
              width: 650,
              icon: 'error',
              title: 'Ingrese el usuario EDC BLOCKCHAIN'
            })
        return ;
      }*/
      Swal.showLoading();
      axios.put(getApiURL() + '/retirement',{
        retirement : this.retirement,
        user_edc_blockchain : this.user_edc_blockchain
      })
      .then(response => {

            Swal.fire({
              width: 650,
              icon: 'success',
              title: 'Retiro exitoso! Soporte enviará en breve el retiro a su Wallet'
            })

          this.get_retirements();
      })
      .catch(error => {
        if (typeof error.response.data.error.status_code) {
          if(error.response.data.error.status_code == 422){
            let message = error.response.data.error.message;
            Swal.fire({
              width: 650,
              icon: 'error',
              title: message.retirement === undefined ? message[0] : message.retirement
            })
          }
        }
      });
    },
    get_retirements : function (){
      axios.get(getApiURL() + '/get_retirement')
      .then(response => {
        this.retirements = response.data.data;
      })
      .catch(error => {
        alert("Ha ocurrido un error")
      });
    }
  }
});

Vue.component('memberships-table-panel',
{
  template:`
  <div>
    <div class="row">
      <div class="col-md-12 col-sm-12 col-lg-12">
        <div class="table-responsive">
          <table class="table table-striped table-hover">
            <thead class="text-white">
              <tr>
                <th>
                  Monto
                </th>
                <th>
                  Concepto
                </th>
                <th>
                  Fecha
                </th>
              </tr>
            </thead>
            <paginate name="commisions" :list="commisions" :per="5" tag="tbody">
              <tr class="text-white" v-if="commisions.length == 0">
                <td :style="Styles.middleAlign" colspan="5">
                  <center>
                    <h4 style="margin: 0;">
                      <label style="margin: 0;">
                        Sin registros
                      </label>
                    </h4>
                  </center>
                </td>
              </tr>
              <tr class="text-white" v-for="commision in paginated('commisions')">
                <td :style="Styles.middleAlign">
                  {{ commision.mount.toLocaleString('de-DE') +' EDC' }}
                </td>
                <td :style="Styles.middleAlign">
                  {{ commision.concept }}
                </td>
                <td :style="Styles.middleAlign">
                  {{ new Date(commision.created_at).toLocaleDateString('es-ES') }}
                </td>
              </tr>
            </paginate>
          </table>
          <paginate-links for="commisions" :limit="5" :show-step-links="true" :classes="{'ul': 'pagination', 'li': 'page-item', 'a': 'page-link'}"></paginate-links>
        </div>
      </div>
    </div>
  </div>
`,
  data() {
    return {
      Styles : {
        middleAlign : {
          'vertical-align': 'middle'
        },
        marginBottom : {
          'margin-bottom' : '15px'
        },
        scrollX : {
          'overflow-x' : 'auto',
          'white-space' : 'nowrap'
        }
      },
      commisions : [],
      paginate : ['commisions']
    }
  },
  created() {
    this.get_memberships();
    data.component_binary_points_table = this;
  },
  methods:{
    get_memberships : function() {
      axios.get(getApiURL()+'/get_memberships_commisions')
      .then(response => {
        this.commisions = response.data.data;
        ////console.log(response.data.data);
      })
      .catch(error => {
        alert("Ha ocurrido un error")
        //console.log(error);
      });
    }
  }
});

Vue.component('benefits-table-panel',
{
  template:`
  <div>
    <div class="row">
      <div class="col-md-12 col-sm-12 col-lg-12">
        <div class="table-responsive">
          <table class="table table-striped table-hover">
            <thead class="text-white">
              <tr>
                <th>
                  Monto
                </th>
                <th>
                  Concepto
                </th>
                <th>
                  Fecha
                </th>
              </tr>
            </thead>
            <paginate name="profits" :list="profits" :per="5" tag="tbody">
              <tr class="text-white" v-if="profits.length == 0">
                <td :style="Styles.middleAlign" colspan="5">
                  <center>
                    <h4 style="margin: 0;">
                      <label style="margin: 0;">
                        Sin registros
                      </label>
                    </h4>
                  </center>
                </td>
              </tr>
              <tr class="text-white" v-for="profit in paginated('profits')">
                <td :style="Styles.middleAlign">
                  {{ profit.profit.toLocaleString('de-DE') +' EDC' }}
                </td>
                <td :style="Styles.middleAlign">
                  {{ profit.concept }}
                </td>
                <td :style="Styles.middleAlign">
                  {{ new Date(profit.created_at).toLocaleDateString('es-ES') }}
                </td>
              </tr>
            </paginate>
          </table>
          <paginate-links for="profits" :limit="5" :show-step-links="true" :classes="{'ul': 'pagination', 'li': 'page-item', 'a': 'page-link'}"></paginate-links>
        </div>
      </div>
    </div>
  </div>
`,
  data() {
    return {
      Styles : {
        middleAlign : {
          'vertical-align': 'middle'
        },
        marginBottom : {
          'margin-bottom' : '15px'
        },
        scrollX : {
          'overflow-x' : 'auto',
          'white-space' : 'nowrap'
        }
      },
      profits : [],
      paginate : ['profits']
    }
  },
  created() {
    this.get_profits();
    data.component_binary_points_table = this;
  },
  methods:{
     buscarEnObjeto(objeto, input_text){
      for (let key in objeto) {
        if(objeto.hasOwnProperty(key) && objeto[key].toString().toLowerCase().includes(input_text) ) {
          return true;
        }
      }
      return false;
    },
    get_profits : function() {
      axios.get(getApiURL()+'/get_earnings')
      .then(response => {
        this.profits = response.data.data;
        ////console.log(response.data.data);
      })
      .catch(error => {
        alert("Ha ocurrido un error")
        //console.log(error);
      });
    }
  }
});

Vue.component('transactions',
{
  template:`
  <div>
    <div class="row">
      <div class="col-md-12 col-sm-12 col-lg-12">
        <center>
          <div class="table-responsive">
            <table class="table table-striped table-hover" >
              <thead class="text-white">
                <tr>
                  <th>
                   Monto
                  </th>
                  <th>
                    Descripción
                  </th>
                  <th>
                    Fecha
                  </th>
                </tr>
              </thead>
              <paginate name="transactions" :list="transactions" :per="5" tag="tbody">
                <tr class="text-white" v-if="transactions.length == 0">
                  <td :style="Styles.middleAlign" colspan="5">
                    <center>
                      <h4 style="margin: 0;">
                        <label style="margin: 0;">
                          Sin registros
                        </label>
                      </h4>
                    </center>
                  </td>
                </tr>
                <tr class="text-white" v-for="transaction in paginated('transactions')">
                 <td :style="Styles.middleAlign">
                    {{transaction.mount.toLocaleString('de-DE') +' EDC' }}
                  </td>
                  <td :style="Styles.middleAlign">
                    {{ transaction.description }}
                  </td>
                  <td :style="Styles.middleAlign">
                    {{ new Date(transaction.created_at).toLocaleDateString('es-ES') }}
                  </td>
                </tr>
              </paginate>
            </table>
            <paginate-links for="transactions" :limit="5" :show-step-links="true" :classes="{'ul': 'pagination', 'li': 'page-item', 'a': 'page-link'}"></paginate-links>
          </div>
        </center>
      </div>
    </div>
  </div>
  `,
  data() {
    return {
      Styles : {
        middleAlign : {
          'vertical-align': 'middle'
        },
        marginBottom : {
          'margin-bottom' : '15px'
        },
        scrollX : {
          'overflow-x' : 'auto',
          'white-space' : 'nowrap'
        }
      },
      transactions : [],
      paginate : ['transactions'],
      filter : ''
    }
  },
  created() {
    this.get_transaction();
    data.component_transactions = this;
  },
  methods:{
    get_transaction : function() {
      axios.get(getApiURL()+'/get_transaction')
      .then(response => {
        this.transactions = response.data.data;
        //console.log(this.upgrades);
      })
      .catch(error => {
        alert("Ha ocurrido un error")
        //console.log(error);
      });
    }
  }
});

Vue.component('unverified-plans-panel',
{
  template:`
  <div :style="Styles.marginTop">
    <center>
      <h3 style="margin-top: 0px;">
        <label>
          Nuevos registros sin verificar
        </label>
      </h3>
    </center>
    <div class="row">
      <div class="col-md-12 col-sm-12 col-lg-12">
        <div class="card text-white" style="background:#3f4052;">
          <div class="table-responsive">
            <table class="table table-striped table-hover">
              <thead class="text-white">
                <tr>
                  <th>
                    Usuario
                  </th>
                  <th>
                    Nombre del usuario
                  </th>
                  <th>
                    Paquete
                  </th>
                  <th>
                    Sponsor
                  </th>
                  <th>
                    Fecha de registro
                  </th>
                  <th>
                    Monto de pago
                  </th>
                  <th>
                  </th>
                </tr>
              </thead>
              <paginate name="plans" :list="plans" :per="5" tag="tbody">
                <tr v-if="plans.length == 0" class="text-white">
                  <td :style="Styles.middleAlign" colspan="6">
                    <center>
                      <h4 style="margin: 0;">
                        <label style="margin: 0;">
                          Sin registros
                        </label>
                      </h4>
                    </center>
                  </td>
                </tr>
                <tr class="text-white" v-for="plan in paginated('plans')">
                  <td :style="Styles.middleAlign">
                    {{ plan.user_name }}
                  </td>
                  <td :style="Styles.middleAlign">
                    {{ plan.name_user }}
                  </td>
                  <td v-if="plan.id > 1" :style="Styles.middleAlign">
                    <span class="badge badge-warning"> Multiple ({{1+'->'+plan.id}})</span>
                     | {{ 'Nvl. '+plan.id+' - '+plan.name }}
                  </td>
                  <td v-else :style="Styles.middleAlign">
                    {{ 'Nivel '+plan.id+' - '+plan.name+' '+plan.value?.toLocaleString('de-DE') }}
                    <span v-if="plan.complete_pay" class="label label-info">Renovación</span>
                  </td>
                  <td :style="Styles.middleAlign">
                    {{ plan.sponsor }}
                  </td>
                  <td :style="Styles.middleAlign">
                    {{ new Date(plan.user_created_at).toLocaleDateString('es-ES')+' '+new Date(plan.user_created_at).toLocaleTimeString('en-US',{'timeStyle' : 'short'}) }}
                  </td>
                  <td v-if="plan.id > 1" :style="Styles.middleAlign">
                    {{ 'Total: '+plan.total_pay?.toLocaleString('de-DE') }}
                  </td>
                  <td v-else :style="Styles.middleAlign">
                    {{ (plan.value + 10000).toLocaleString('de-DE') }} EDC
                  </td>
                  <td class="text-center">
                    <button type="button" class="btn btn-primary btn-sm" @click="verifyUserPlan(plan)"><strong>Verificar</strong></button>
                    <button type="button" class="btn btn-danger btn-sm" @click="deleteUserPlan(plan)"><strong>Eliminar</strong></button>
                  </td>
                </tr>
              </paginate>
            </table>
            <paginate-links for="plans" :limit="5" :show-step-links="true" :classes="{'ul': 'pagination', 'li': 'page-item', 'a': 'page-link'}"></paginate-links>
          </div>
        </div>
      </div>
    </div>
  </div>
`,
  data() {
    return {
      Styles : {
        middleAlign : {
          'vertical-align': 'middle'
        },
        marginBottom : {
          'margin-bottom' : '15px'
        },
        marginTop : {
          'margin-top' : '15px'
        },
        scrollX : {
          'overflow-x' : 'auto',
          'white-space' : 'nowrap'
        }
      },
      plans : [],
      paginate : ['plans'],
      filtro : ''
    }
  },
  computed: {
    tablefilter: function() {
      return this.plans.filter(plan => {
        return this.buscarEnObjeto(plan, this.filtro.toLowerCase());
      });
    }
  },
  created() {
    this.get_unverified_plans();
    data.component_unverified_plans_panel = this;
  },
  methods:{
     buscarEnObjeto(objeto, input_text){

      for (let key in objeto) {
        if (objeto.hasOwnProperty(key) && objeto[key].toString().toLowerCase().includes(input_text) ) {
          return true;
        }
      }
      return false;
    },
    get_unverified_plans : function() {
      axios.get(getApiURL()+'/get_user_unverified')
      .then(response => {
        this.plans = response.data.data;
        ////console.log(response.data.data);
      })
      .catch(error => {
        alert("Ha ocurrido un error")
        //console.log(error);
      });
    },
    verifyUserPlan : function(user_plan){

      let msg = '';
      user_plan.complete_pay ? msg = 'renovado' : msg = 'activado'

      Swal.fire({
        width: 600,
        title: 'Confirmación',
        icon: 'info',
        text: 'El paquete del usuario '+user_plan.name_user+' sera '+msg,
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return axios.put(getApiURL()+'/active_user', {
            user_id : user_plan.user_id
          })
          .then(response => {
            if (response.status != '200') {
              throw new Error(response.statusText)
            }
            return response.data.data;
          })
         .catch(error => {
           Swal.showValidationMessage(
             `Request fail: ${error}`
           )
         });
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then(result => {
          if(result.value){
            Swal.fire({
              width: 650,
              icon: 'success',
              title: 'Verificacion realizada con exito'
            })

            this.get_unverified_plans();
          }
      })
    },
    deleteUserPlan : function(user_plan){

      Swal.fire({
        width: 400,
        title: 'Confirmación',
        icon: 'warning',
        text: 'El usuario '+user_plan.name_user+' sera eliminado',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        confirmButtonColor: '#d33',
        cancelButtonColor: '#aaa',
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return axios.post(getApiURL()+'/user/delete', {
            user_id : user_plan.user_id
          })
          .then(response => {
            if (response.status != '200') {
              throw new Error(response.statusText)
            }
            return response.data.data;
          })
         .catch(error => {
           Swal.showValidationMessage(
             `Request fail: ${error}`
           )
         });
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then(result => {
          if(result.value){

            Swal.fire({
              width: 650,
              icon: 'success',
              title: 'Eliminado con exito.'
            })
            this.get_unverified_plans();
          }
      })
    }
  }
});

Vue.component('unverified-upgrades',
{
  template:`
  <div :style="Styles.marginTop">
    <center>
      <h3 style="margin-top: 0px;">
        <label>
          Upgrades pendientes por verificar
        </label>
      </h3>
    </center>
    <div class="row">
      <div class="col-md-12 col-sm-12 col-lg-12">
        <div class="card" style="background:#3f4052;">
          <div class="table-responsive">
            <table class="table table-striped table-hover">
              <thead class="text-white">
                <tr>
                  <th>
                    Usuario
                  </th>
                  <th>
                    Nombre del usuario
                  </th>
                  <th>
                    Paquete de upgrade
                  </th>
                  <th>
                  </th>
                </tr>
              </thead>
              <paginate name="upgrades" :list="upgrades" :per="5" tag="tbody">
                <tr v-if="upgrades.length == 0" class="text-white">
                  <td :style="Styles.middleAlign" colspan="4">
                    <center>
                      <h4 style="margin: 0;">
                        <label style="margin: 0;">
                          Sin registros
                        </label>
                      </h4>
                    </center>
                  </td>
                </tr>
                <tr class="text-white" v-for="upgrade in paginated('upgrades')">
                  <td :style="Styles.middleAlign">
                    {{ upgrade.user_name }}
                  </td>
                  <td :style="Styles.middleAlign">
                    {{ upgrade.name_user }}
                  </td>
                  <td v-if="(upgrade.id - upgrade.level_id) > 1" :style="Styles.middleAlign">
                    <span class="badge badge-warning"> Multiple ({{upgrade.level_id+'->'+upgrade.id}})</span>
                    {{ 'Total: '+upgrade.total_pay.toLocaleString('de-DE')+' | '+'Nivel '+upgrade.id+' - '+upgrade.name }}
                  </td>
                  <td v-else :style="Styles.middleAlign">
                    {{ 'Nivel '+upgrade.id+' - '+upgrade.name+' '+upgrade.value.toLocaleString('de-DE') }}
                  </td>
                  <td class="text-center">
                    <button type="button" class="btn btn-primary btn-sm" @click="verifyUpgrade(upgrade)"><strong>Verificar upgrade</strong></button>
                  </td>
                </tr>
              </paginate>
            </table>
            <paginate-links for="upgrades" :limit="5" :show-step-links="true" :classes="{'ul': 'pagination', 'li': 'page-item', 'a': 'page-link'}"></paginate-links>
          </div>
        </div>
      </div>
    </div>
  </div>
`,
  data() {
    return {
      Styles : {
        middleAlign : {
          'vertical-align': 'middle'
        },
        marginBottom : {
          'margin-bottom' : '15px'
        },
        marginTop : {
          'margin-top' : '15px'
        },
        scrollX : {
          'overflow-x' : 'auto',
          'white-space' : 'nowrap'
        }
      },
      upgrades : [],
      paginate : ['upgrades'],
      filtro : ''
    }
  },
  computed: {
    tablefilter: function() {
      return this.upgrades.filter(upgrade => {
        return this.buscarEnObjeto(upgrade, this.filtro.toLowerCase());
      });
    }
  },
  created() {
    this.get_unverified_upgrades();
    data.component_unverified_upgrades = this;
  },
  methods:{
     buscarEnObjeto(objeto, input_text){

      for (let key in objeto) {
        if (objeto.hasOwnProperty(key) && objeto[key].toString().toLowerCase().includes(input_text) ) {
          return true;
        }
      }
      return false;
    },
    get_unverified_upgrades : function() {
      axios.get(getApiURL()+'/get_user_unverified_upgrade')
      .then(response => {
        this.upgrades = response.data.data;
        //console.log(this.upgrades);
      })
      .catch(error => {
        alert("Ha ocurrido un error")
        //console.log(error);
      });
    },
    verifyUpgrade : function(upgrade){

      let message = '';

      if((upgrade.id - upgrade.level_id) > 1){
        message = 'El upgrade multiple desde el nivel '+upgrade.level_id+' al nivel '+upgrade.id+' - '+upgrade.name+' por un valor total de '+upgrade.total_pay.toLocaleString('de-DE')+' de '+upgrade.user_name+' sera verificado.';
      }else{
        message = 'El upgrade a '+upgrade.name+' '+upgrade.value.toLocaleString('de-DE')+' de '+upgrade.user_name+' sera verificado.';
      }

      Swal.fire({
        width: 600,
        title: 'Confirmación',
        icon: 'info',
        text: message,
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return axios.put(getApiURL()+'/active_user_upgrade', {
            user_id : upgrade.user_id,
            level_id : upgrade.id
          })
          .then(response => {
            if (response.status != '200') {
              throw new Error(response.statusText)
            }
            return response.data.data;
          })
         .catch(error => {
           Swal.showValidationMessage(
             `Request fail: ${error}`
           )
         });
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then(result => {
          if(result.value){
            Swal.fire({
              width: 650,
              icon: 'success',
              timer: 3000,
              title: 'Upgrade verificado.'
            })

            this.get_unverified_upgrades();
          }
      })
    }
  }
});

Vue.component('level-network',
{
  template:`
  <div class="row">
    <div class="col-sm-12 col-md-12 mb-12">
      <div v-if="tree_mode && !data_user.master_acc" class="row">
        <div class="col-sm-12 col-md-12">
          <center>
            <h3>
              <label>
                Red
              </label>
            </h3>
          </center>
        </div>
        <div class="col-sm-12 col-md-12">
          <div class="card">
            <button v-if="!data_user.master_acc" type="button" style="float:right;" class="btn btn-sm btn-success" @click="changeView">
              Cambiar vista
            </button>
            <div class="card-body">
              <div class="container col-sm-12 col-md-12">
                <svg class="col-sm-12 col-md-12" style="padding: 0; height: 500px;" id="SVGFrame" viewBox="0 0 600 900" version="1.1">
                  <g id="Gtree">
                    <g class="links"></g>
                    <g class="nodes"></g>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="row">
        <div class="col-sm-12 col-md-12 mb-12">
          <center>
            <h3>
              <label>
                Progreso de niveles
              </label>
            </h3>
          </center>
        </div>
        <div class="col-sm-12 col-md-12 mb-12">
          <div class="card text-white" style="background:#3f4052;">
            <button v-if="!data_user.master_acc" type="button" style="float:right;" class="btn btn-sm btn-success" @click="changeView">
              Cambiar vista
            </button>
            <div class="card-body">
              <ul style="overflow-x: auto;" class="list-group list-group-horizontal">
                <li v-for="(referral, index) in directs" class="list-group-item" style="border: none; background-color: transparent;">
                  <div class="content-direct" style="background-size: 100%;">
                    <center>
                      <span class="badge badge-primary" style="font-size: 15px; margin: 5px;">{{ index+1 }}</span>
                    </center>
                    <center>
                      <img :src="'`+getApiURL()+`/img/profiles/'+user.imagen" @click="openModal(referral)" @data-id="" class="irf" id="avt">
                    </center>
                  </div>
                  <center>
                    <h6 style="margin-top: -15px;">
                      <span class="badge badge-primary">{{ referral.direct.user_name }}</span>
                    </h6>
                    <h6 :style="Style.null_margin" class="card-title">
                      <span class="badge badge-primary" style="position: relative;z-index: 1;margin-bottom: -5px;width: 96px;">
                      {{ referral.level.name }}
                      </span>
                    </h6>
                  </center>
                  <div>
                    <div class="card" style="border: none;">
                      <ul class="list-group list-group-flush">
                        <li :style="[{'border-bottom-width' : '0px'}, Style.stretch_padding, Style.cellborders, Style.borderTop]" :class="['list-group-item', get_level_color(9, referral.direct.level_id, index+1, directs[index+1]?.level.id, index==0?true:false)]"><center><h6 :style="Style.null_margin">Nivel 9</h6></center></li>
                        <li :style="[{'border-bottom-width' : '0px'}, Style.stretch_padding, Style.cellborders]" :class="['list-group-item', get_level_color(8, referral.direct.level_id, index+1, directs[index+1]?.level.id, index==0?true:false)]"><center><h6 :style="Style.null_margin">Nivel 8</h6></center></li>
                        <li :style="[{'border-bottom-width' : '0px'}, Style.stretch_padding, Style.cellborders]" :class="['list-group-item', get_level_color(7, referral.direct.level_id, index+1, directs[index+1]?.level.id, index==0?true:false)]"><center><h6 :style="Style.null_margin">Nivel 7</h6></center></li>
                        <li :style="[{'border-bottom-width' : '0px'}, Style.stretch_padding, Style.cellborders]" :class="['list-group-item', get_level_color(6, referral.direct.level_id, index+1, directs[index+1]?.level.id, index==0?true:false)]"><center><h6 :style="Style.null_margin">Nivel 6</h6></center></li>
                        <li :style="[{'border-bottom-width' : '0px'}, Style.stretch_padding, Style.cellborders]" :class="['list-group-item', get_level_color(5, referral.direct.level_id, index+1, directs[index+1]?.level.id, index==0?true:false)]"><center><h6 :style="Style.null_margin">Nivel 5</h6></center></li>
                        <li :style="[{'border-bottom-width' : '0px'}, Style.stretch_padding, Style.cellborders]" :class="['list-group-item', get_level_color(4, referral.direct.level_id, index+1, directs[index+1]?.level.id, index==0?true:false)]"><center><h6 :style="Style.null_margin">Nivel 4</h6></center></li>
                        <li :style="[{'border-bottom-width' : '0px'}, Style.stretch_padding, Style.cellborders]" :class="['list-group-item', get_level_color(3, referral.direct.level_id, index+1, directs[index+1]?.level.id, index==0?true:false)]"><center><h6 :style="Style.null_margin">Nivel 3</h6></center></li>
                        <li :style="[{'border-bottom-width' : '0px'}, Style.stretch_padding, Style.cellborders]" :class="['list-group-item', get_level_color(2, referral.direct.level_id, index+1, directs[index+1]?.level.id, index==0?true:false)]"><center><h6 :style="Style.null_margin">Nivel 2</h6></center></li>
                        <li :style="[{'border-bottom-width' : '0px'}, Style.stretch_padding, Style.cellborders, Style.borderBottom]" :class="['list-group-item', get_level_color(1, referral.direct.level_id, index+1, directs[index+1]?.level.id, index==0?true:false)]"><center><h6 :style="Style.null_margin">Nivel 1</h6></center></li>
                      </ul>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
 `,
 props:['user'],
 data() {
    return {
      Style : {
        stretch_padding : {
          padding : '8px 0px 8px 0px'
        },
        null_margin : {
          margin : '0px'
        },
        marginTop : {
          'margin-top': '15px'
        },
        cellborders : {
          'border-left' : '2px solid #007bff',
          'border-right': '2px solid #007bff'
        },
        borderBottom : {
          'border-bottom': '2px solid #007bff'
        },
        borderTop : {
          'border-top': '2px solid #007bff'
        }
      },
      directs : '',
      tree_layout : '',
      tree_mode: true,
      cycle_closed : '',
      referrals : '',
      level : 2,
      data_user : this.user
    }
  },
  created(){
    //console.log(this.user)
    if(this.tree_mode && !this.data_user.master_acc){
      this.get_entire_directs();
    }else{
      this.get_level_progresses();
    }
  },
  methods:{
    get_level_progresses: function(){
      axios.post(getApiURL()+'/get_directs',{
        user_id : this.data_user.id
      })
       .then(response => {
         this.cycle_closed = response.data.data.cycle_closed;
         this.directs = response.data.data.directs;
       })
       .catch(error => {
        alert("Ha ocurrido un error")
        //console.log(error);
      });
    },
    openModal: function(referral){
      data.component_direct_modal.direct = referral.direct
      $("#ModalCenter").modal("show");
    },
    get_level_color: function(level, user_level, current_index, adjacent_level, high_level){

      if(level <= this.cycle_closed && user_level >= this.cycle_closed){

        if(user_level == this.cycle_closed && level == user_level){
          return 'list-group-item-success bg-success text-white'
        }else if(level == this.cycle_closed && high_level == true){
          return 'list-group-item-success bg-success text-white'
        }else if(current_index % 2 == true && level > adjacent_level){
          return 'list-group-item-dark bg-info text-white'
        }else{
          return 'list-group-item-dark bg-dark text-white'
        }
      }else if(level <= this.cycle_closed && level< user_level){

        if(current_index % 2 == true && level > adjacent_level){
          return 'list-group-item-dark bg-info text-white'
        }else{
          return 'list-group-item-dark bg-dark text-white'
        }
      }else{

        if(user_level < level){
          return 'list-group-item-light bg-light'
        }else{

          if(user_level == level){
            return 'list-group-item-primary bg-primary text-white'
          }else if(user_level > level){
            return 'list-group-item-info bg-info text-white'
          }
        }
      }
    },
    get_entire_directs: function(){

      let type_request = '';
      if(this.data_user.master_acc == true){
        type_request = 'get_entire_directs'
      }else{
        type_request = 'get_children_directs'
      }

      axios.get(getApiURL()+'/'+type_request)
       .then(response => {
         this.tree_layout = response.data.data;
       })
       .catch(error => {
        alert("Ha ocurrido un error")
        //console.log(error);
      }).finally(() => {
        this.constructGraphicTree(this.tree_layout)
      });
    },
    constructGraphicTree : function(tree_layout){

      var root = d3.hierarchy(tree_layout)
      var treeWidth = 0;
      var gtreeWidth = 0;
      var treeHeight = 0;

      if(this.data_user.master_acc == true){

        treeWidth = 2600;
        gtreeWidth = (root.x/2)+(root.x*0.1);
        treeHeight = 750;
      }else{

        treeWidth = 1500;
        gtreeWidth = (root.x/2)+(root.x*0.1);
        treeHeight = 350;
      }

      var treeLayout = d3.tree()
                          .size([treeWidth, treeHeight])

      treeLayout(root)

      if(this.data_user.master_acc == true){
        gtreeWidth = (root.x/2)+(root.x*0.3);
      }else{
        gtreeWidth = (root.x/2)+(root.x*0.1);
      }

      d3.select('svg g#Gtree')
        .attr("transform", "matrix(1,0,0,1,-"+gtreeWidth+",60)")

      window.zoomTiger = svgPanZoom('#SVGFrame',{
        zoomEnabled: true,
        controlIconsEnabled: true,
        fit: true,
        center: true,
      });

      var img = 'https://img2.freepng.es/20180331/eow/kisspng-computer-icons-user-clip-art-user-5abf13db298934.2968784715224718991702.jpg';

      // Nodes
      var nodes = d3.select('svg g.nodes')
        .selectAll('g.node')
        .data(root.descendants())
        .enter()
        .append('g')
        .attr("class", "node")
        .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })

        nodes.append("defs")
           .attr("id", "imgdefs")
           .append("pattern")
           .attr("id", function(d){ return 'img'+d.data.id})
           .attr("height", 1)
           .attr("width", 1)
           .attr("x", "0")
           .attr("y", "0")
           .append("image")
           .attr('x', -20)
           .attr('y', -20)
           .attr("height", '100')
           .attr("width", '100')
           .attr("xlink:href", img)

      var images = nodes.append("svg:circle")
         .attr("r", 30)
         .attr("stroke", 'steelblue')
         .attr("stroke-width", 2)
         .attr("fill", function(d){ return "url(#img"+d.data.id+")"; });

      //Seteamos los eventos
      images.on('mouseenter', function(d){
        if(d.parent != null){
          //console.log(d3.select(this).parent);
          d3.select("pattern#img"+d.data.id).select("image")
            .transition()
            .attr("width","110").attr("height","110");
            // select element in current context
          d3.select( this )
            .transition()
            .attr("r", "35")
            //.attr("height", 100)
            //.attr("width", 100);
        }
      })
      .on( 'mouseleave', function(d){
        if(d.parent != null){
          d3.select("pattern#img"+d.data.id).select("image")
            .transition()
            .attr("width","100")
            .attr("height","100");

          d3.select( this )
            .transition()
            .attr("r", "30")
            //.attr("height", 50)
            //.attr("width", 50);
        }
      })
      .on('click', function(d){
        if(d.parent != null){
          data.component_direct_modal.direct = d.data
          data.component_direct_modal.get_direct_referrals()
          $("#ModalCenter").modal("show");
        }
      });

      var label_width = 75;
      var label_height = 20;
      var bbox = images.node().getBBox();
      // Labels
      nodes.append('rect')
        .classed('label', true)
        .attr("width", label_width)
        .attr("height", label_height)
        .attr('x', function(d) {return bbox.x - (bbox.width*0.11);})
        .attr('y', function(d) {return (bbox.height * 0.85) + bbox.y})
        .attr("rx", '7')

      var bbox2 = nodes.node().getBBox();
      nodes.append('text')
      .attr("stroke", "#fff")
      .attr("text-anchor", 'middle')
      .attr('x', function(d) {return bbox2.x + (bbox2.width*0.5);})
      .attr('y', function(d) {return bbox.y + (bbox.height+5);})
      .attr('dy', ".10em")
      .text(function(d, i){
        return d.data.user_name;
      });

      nodes.append('rect')
        .classed('label', true)
        .attr("width", label_width/3.5)
        .attr("height", label_height)
        .attr('x', function(d) {return bbox.x + (bbox.width*0.68);})
        .attr('y', function(d) {return bbox.y*1.3})
        .attr("rx", '7')

      nodes.append('text')
        .attr("stroke", "#fff")
        .attr("text-anchor", 'middle')
        .attr('x', function(d) {return bbox2.x + (bbox2.width*0.77);})
        .attr('y', function(d) {return bbox.y*0.8;})
        .text(function(d){
          return d.data.level_id;
        });

      // Links
      d3.select('svg g.links')
        .selectAll('line.link')
        .data(root.links())
        .enter()
        .append('line')
        .classed('link', true)
        .attr('x1', function(d) {return d.source.x;})
        .attr('y1', function(d) {return d.source.y;})
        .attr('x2', function(d) {return d.target.x;})
        .attr('y2', function(d) {return d.target.y;});
    },
    getRedUsers : function(directs){
      axios.post(getApiURL()+'/get_red_referrals',{
        directs : directs
      }).then(response => {

          this.referrals = response.data.data;
          //console.log(this.referrals);
       }).catch(error => {
          alert("Ha ocurrido un error")
          //console.log(error);
      }).finally(() => {
          if(this.referrals != null){
            this.constructBinary(this.referrals);
          }
      });
    },
    constructBinary : function(referrals){

      var sponsor_id = '';
      var prev_sponsor_id = '';
      var level = this.level;
      var sponsors = [];

      $.each(referrals, function(i, item){

        if(level == 2){
          if(item.sponsor_id != prev_sponsor_id){
            let cell = $(".binary").find('div #'+item.sponsor_id);
            $(cell).find('span.badge').removeClass("badge-secondary");
            $(cell).find('span.badge').addClass("badge-primary");
            $(cell).removeClass("empty-cell");
            $(".binary").find('div #'+item.sponsor_id).append("<div id='row-"+level+item.sponsor_id+"' class='row-"+level+"'></div>");
          }
        }else if(level >2){
          if(i==0 || item.sponsor_id != prev_sponsor_id){
            let cell = $(".binary").find('div #'+item.sponsor_id);
            $(cell).find('span.badge').removeClass("badge-secondary");
            $(cell).find('span.badge').addClass("badge-primary");
            $(cell).removeClass("empty-cell");
            $(".binary").find('div #'+item.sponsor_id).append("<div id='row-"+level+item.sponsor_id+"' class='row-"+level+"'></div>");
          }
        }

        $('div#'+item.sponsor_id).find('div.row-'+level).append("<div class='cell-row empty-cell' id="+item.id+" style='vertical-align: top; display: inline-block;'>"
                  +"<img src='img/image-quiet.jpg' class='irf' data-id=''>"
                  +"<br>"
                  +"<h6 style='margin-top: -15px;'>"
                  +"<span class='badge badge-secondary'>"+item.user_name+"</span>"
                  +"</h6>"
                  +"</div>");

        prev_sponsor_id = item.sponsor_id;
        sponsors.push(item.id);
      });

      this.level++;
      if(this.level <=4){
        this.getRedUsers(sponsors);
      }
      //console.log(this.level);
    },
    changeView: function(){

      if(this.tree_mode != true){
        this.tree_mode = true
        this.get_entire_directs();
      }else{
        this.tree_mode = false
        this.get_level_progresses();
      }
    }
  }
});

Vue.component('direct-modal',
{
  template:`
  <div class="modal fade" id="ModalCenter" tabindex="-1" role="dialog" aria-labelledby="ModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title" id="ModalCenterTitle">Datos del usuario</h3>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-6 col-sm-6">
                <h5>Nombre:</h5>
                <p class="h6" id="name_user">{{ direct.name+' '+direct.last_name }}</p>
                <h5>Nivel actual:</h5>
                <p class="h6" id="name_level">{{ direct.level_id+' - '+direct.level_name }}</p>
                <h5>Correo:</h5>
                <p class="h6" id="email">{{ direct.email }}</p>
              </div>
              <div class="col-md-6 col-sm-6">
                <center>
                  <img :src="'`+getApiURL()+`/img/profiles/'+direct.imagen" style="border:3px solid #3c8dbc ; border-radius:50%; width: 150px; height:150px;">
                </center>
              </div>
            </div>
            <div v-if="direct_referrals_count.length != null && direct_referrals_count.length != 0" class="row">
              <div class="col-md-12 col-sm-12">
                <center>
                  <h1 class="display-4">Niveles activos</h1>
                </center>
                <div class="card-group" style="margin: 20px 0 0 0;">
                  <div v-for="group_directs in direct_referrals_count" style="margin: 0 15px 0 15px;">
                    <center>
                      <div class="badge-dark" style="padding-top: 17px; width: 70px; border-radius:5%;">
                        <h4 style="margin-top: -15px;">
                          <span class="badge badge-primary" style="height:45px; width: 68px">Nivel<br>{{ group_directs.level_id }}</span>
                        </h4>
                        <h6 :style="Style.null_margin" class="card-title">
                          Directos
                          {{ group_directs.directs_number }}
                        </h6>
                      </div>
                    </center>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `,
  data() {
    return {
      Style : {
        marginBottom : {
          'margin-bottom' : '15px'
        },
        progress : 0
      },
      direct : {
        name : '',
        last_name : '',
        level_id : '',
        email : '',
        imagen: ''
      },
      direct_referrals_count : 0
    }
  },
  created(){
    data.component_direct_modal = this
  },
  methods:{
    get_direct_referrals : function(){
      axios.post(getApiURL() + '/get_directs_group_by_level',{
        user_id : this.direct.id
      })
      .then(response => {
        this.direct_referrals_count = response.data.data
      })
      .catch(error => {
        //let message = error.response.data.error.message;
        Swal.fire({
          position: 'bottom',
          toast: true,
          timer: 4000,
          timerProgressBar: true,
          icon: error
        })
        // alert("Ha ocurrido un error");
      });
    }
  }
});

Vue.component('level-component',
{
  template:`
  <div class="row">
    <div class="col-sm-12 col-md-12">
      <div v-if="pending_lvl.name" class="card text-white bg-secondary mb-3">
        <div class="card-header">
          <h3 style="margin: 0;">
            <label style="margin: 0;">
              Nivel adquirido pendiente
            </label>
          </h3>
        </div>
        <div class="card-body">
          <center>
            <img :src="'`+getApiURL()+`/img/'+ pending_lvl.img" style="width: 100px; height: 100px;" alt="">
            <h3><span class="label label-primary">{{ pending_lvl.name }}</span></h3>
            <h6>Esperando verificación de su compra para actualización de su nivel.</h6>
          </center>
        </div>
      </div>
      <center>
        <h3>
          <label>
            Niveles disponibles
          </label>
        </h3>
      </center>
      <div class="card-group">
        <div v-for="level in levels_available" :style="Styles.marginBottom" class="col-sm-3 col-md-3">
          <div class="card text-white" :style="[{'background':'#32aeea'}, Styles.padding]">
            <center>
              <img :src="'`+getApiURL()+`/img/'+level.img" style="width: 100px; height: 100px;" alt="">
            </center>
            <div class="caption">
              <center>
                <h6>Nivel {{ level.id }}</h6>
                <h3>{{ level.name }}</h3>
                <p>Valor: {{ level.value.toLocaleString('de-DE') }} EDC</p>
                <h4 v-if="(current_lvl.id >= level.id) || (pending_level.id >= level.id)">
                  <span v-if="current_lvl.id >= level.id" class="badge badge-success">
                    Adquirido
                  </span>
                  <span v-else-if="pending_level.id >= level.id" class="badge badge-secondary">
                    Pendiente
                  </span>
                </h4>
                <button v-else type="button" class="btn btn-primary" data-toggle="modal" data-target="#Adquirelevel" @click="upgrade_level(level)">Adquirir</button>
              </center>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `,
  props : ['user','current_level','pending_level'],
  data() {
    return {
      Styles : {
        marginBottom : {
          'margin-bottom' : '15px'
        },
        padding : {
          'padding-top' : '5px',
          'padding-bottom' : '5px'
        },
        scrollX : {
          'overflow-x' : 'auto',
          'white-space' : 'nowrap'
        }
      },
      level : {
        name : ''
      },
      current_lvl : this.current_level,
      pending_lvl : this.pending_level,
      levels_available : {}
    }
  },
  created(){
    this.get_levels_available();
    data.component_level = this;
  },
  methods:{
    get_levels_available : function () {
      axios.get(getApiURL()+'/get_levels_available')
       .then(response => {
         this.levels_available = response.data.data;
       })
       .catch(error => {
        alert("Ha ocurrido un error")
        //console.log(error);
      });
    },
    upgrade_level : function(selected_level){
      data.component_level_acquire_modal.selected_level = selected_level
      data.component_level_acquire_modal.current_level = this.current_lvl

      if((selected_level.id - this.current_lvl.id) > 1){
        let levels = []
        let total_pay = 0;
        let p = 0;

        for(var i = 0; i < this.levels_available.length; i++){

          for(o = this.current_lvl.id+1; o <= selected_level.id; o++){

            if(o == this.levels_available[i]['id']){

              levels[p] = this.levels_available[i]
              total_pay += this.levels_available[i]['value']
              p++
            }
          }
        }

        data.component_level_acquire_modal.levels = levels
        data.component_level_acquire_modal.total_pay = total_pay
      }else{
        data.component_level_acquire_modal.levels = {}
        data.component_level_acquire_modal.total_pay = ''
      }

     // $("#Adquirelevel").modal('show');
    }
  }
});

Vue.component('level-acquire-modal',
{
  template:`
  <div class="modal fade" id="Adquirelevel" tabindex="-1" role="dialog" aria-labelledby="ModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title" id="ModalCenterTitle">Actualizar nivel</h3>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12">
                <center>
                  <p style="font-size: 18px; font-weight: bold; margin-bottom: 15px;">
                    Nivel seleccionado:
                  </p>
                </center>
                <div class="row">
                  <div class="col-lg-12 col-md-12 col-sm-12">
                    <center>
                      <div class="well well-sm">
                        <img :src="'`+getApiURL()+`/img/'+ selected_level.img"  style="width: 120px; height: 120px;">
                        <h2>
                        <span class="label label-warning label-lg">{{ selected_level.name }}</span>
                        </h2>
                        <p style="font-size: 1.5em">Valor:  {{ selected_level.value.toLocaleString('de-DE') }} EDC</p>
                      </div>
                    </center>
                    <div v-if="levels.length > 0" class="well well-sm">
                      <ul class="list-group">
                        <li class="list-group-item text-muted">
                          Secuencia de niveles necesarios
                        </li>
                        <li v-for="level in levels" class="list-group-item text-right">
                          <span class="pull-left">
                            <strong>
                              Nivel {{ level.id }} - {{ level.name }}
                            </strong>
                          </span>
                          <p style="margin: 0;">
                            {{ level.value.toLocaleString('de-DE') }}
                          </p>
                        </li>
                        <li class="list-group-item text-right">
                          <span class="pull-left">
                            <strong>
                              TOTAL A PAGAR
                            </strong>
                          </span>
                          <p style="margin: 0;">
                            {{ total_pay.toLocaleString('de-DE') }} EDC
                          </p>
                        </li>
                      </ul>
                    </div>
                    <h2 v-else>
                      <p>
                        Total a pagar: {{ selected_level.value.toLocaleString('de-DE') }} EDC
                      </p>
                    </h2>
                    <div v-if="levels.length > 0" style="margin: 15px 0 0 0;">
                      <button type="button" class="btn btn-primary" @click="upgrade(levels, 'E', true)">Pago externo</button>
                      <button type="button" class="btn btn-success" @click="upgrade(levels, 'I', true)">Pago con balance interno</button>
                    </div>
                    <div v-else style="margin: 15px 0 0 0;">
                      <button type="button" class="btn btn-primary" @click="upgrade(selected_level, 'E')">Pago externo</button>
                      <button type="button" class="btn btn-success" @click="upgrade(selected_level, 'I')">Pago con balance interno</button>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-info" data-dismiss="modal">Cerrar</button>
        </div>
      </div>
    </div>
  </div>
  `,
  data() {
    return {
      Style : {
        marginBottom : {
          'margin-bottom' : '15px'
        },
        progress : 0
      },
      selected_level : {
        img : '',
        name : '',
        value : ''
      },
      current_level : {
        img : '',
        name : '',
        value : ''
      },
      levels : {},
      total_pay : ''
    }
  },
  created(){
    data.component_level_acquire_modal = this
  },
  methods:{
    upgrade : function(selected_level, tipo_pago, multiple = false){

      let msj = '';

      if(tipo_pago == 'E'){
        msj = 'Su actualización de nivel quedara pendiente, cuando se haya confirmado el pago se actualizara su cuenta con el nuevo nivel.';
      }else if(tipo_pago == 'I'){
        msj = 'Su nuevo nivel sera acreditado automaticamente en su cuenta.';
      }

      Swal.fire({
        width: 600,
        title: 'Confirmación',
        icon: 'info',
        html: msj,
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return axios.post(getApiURL()+'/upgrade_level', {
            level : selected_level,
            tipo_pago : tipo_pago,
            multiple : multiple
          })
          .then(response => {
            if (response.status != '200') {
              throw new Error(response.statusText)
            }
            return response.data.data;
          })
          .catch(error => {
            //console.log(error.status )
            if(error.response.data.error.status_code == '422'){
              Swal.showValidationMessage(
                 `${error.response.data.error.message.error}`
               )
            }else{
                Swal.showValidationMessage(
                 `Request fail: ${error}`
               )
            }
         });
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then(result => {
          if(result.value){

            let new_level = result.value
            let msj = ''

            if(tipo_pago == 'E'){
              msj = 'Se ha realizado la compra, su nivel sera acreditado luego de verificarse.'
              data.component_level.pending_lvl = this.selected_level
            }else{
              msj = 'Se ha actualizado exitosamente su nivel.'
            }

            Swal.fire({
              width: 650,
              icon: 'success',
              title: msj
            })

            this.level = new_level;
            data.component_level.current_lvl = new_level;
            data.component_level.get_levels_available();
            $("#Adquirelevel").modal('hide');
          }
      })
    }
  }
});

Vue.component('kyc-upload',
{
  template:`
  <div class="row" :style="Styles.marginTop">
    <div class="col-lg-12 col-md-12 col-sm-12">
      <center>
        <h3 style="margin-top: 0px;">
          <label>
            Verificación de KYC
          </label>
        </h3>
      </center>
      <div v-if="kyc_status == 'A'" class="alert alert-success" role="alert">
        <h4 class="alert-heading">Verificado</h4>
        <p>Sus documentos han sido aceptados.</p>
      </div>
      <div v-else-if="kyc_status == 'E'" class="alert alert-info" role="alert">
        <h4 class="alert-heading">En espera de revisión.</h4>
        <p>Sus documentos enviados estan en proceso de verificación, por favor sea paciente.</p>
      </div>
      <div v-else-if="kyc_status == 'N' || kyc_status == 'R'" class="card text-white" style="background:#3f4052;">
        <div v-if="kyc_status == 'R'" class="alert alert-danger alert-dismissible fade show" role="alert">
          <strong>Sus documentos han sido rechazados!</strong>
          Por favor vuelva a enviar sus documentos correctamente, verifique que toda la información se vea total y claramente.
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="card-body">
          <h4>
            <label>
              Documentos a subir
            </label>
          </h4>
          <h6>
            <label>
              * Puede subir su documento de identidad (DNI) o su pasaporte para realizar la verificación.
              <br>
              * Por favor verifique que los documentos se vean claramente.
              <br>
              * Puede ser documento o imagen.
              <br>
              * El archivo seleccionado no debe pesar mas de 2MB.
            </label>
          </h6>
          <div class="card bg-light mb-3" :style="[{'color': 'black'},Styles.marginBottom]">
            <div class="card-header">
              <h6 style="margin:0;">
                <label style="margin:0;">
                  Documento seleccionado
                </label>
                <input type="button" style="float:right; margin:0;" class="btn btn-sm btn-info" value="Cargar Archivo" @click="kycUpload()">
              </h6>
            </div>
            <div class="card-body">
              <input type="file" id="file-kyc-input" name="file-kyc-input" ref="files_upload" @change="getFile()" style="display: none">
              <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                <ol class="carousel-indicators">
                  <li data-target="#carouselExampleIndicators" class="bg-info" v-for="(file,index) in files_upload" v-bind:data-slide-to="index" v-bind:class="index == 0? 'active':null"></li>
                </ol>
                <div class="carousel-inner">
                  <div v-for="(file,index) in files_upload" v-bind:class="index == 0? 'active':null" class="carousel-item">
                    <div v-if="file.type.split('/')[0] == 'image'">
                      <div class="row" style="margin-bottom: 5px;">
                        <div class="col-12">
                          <div class="form-inline">
                            <div class="form-group mb-2">
                              <h5 style="margin:0;">
                                <label style="margin:0;">
                                  <span class="badge badge-info">{{ file.document_type == 'DNI'? 'DNI' : 'Domicilio' }}</span>
                                  &nbsp;&nbsp;
                                  <i class="icon-file"></i>
                                  <b>{{file.name}}</b>
                                </label>
                              </h5>
                              &nbsp;
                              <button type="button" class="btn btn-danger btn-sm"  aria-label="Close" @click="DeleteFile(index)" title="">
                                Remover
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-12">
                          <img style="border: solid 2px black; border-radius: 1%;" :src="file.url" height="500px" width="100%">
                        </div>
                      </div>
                    </div>
                    <div v-else-if="file.type == 'application/pdf' && file.name.split('.')[1] == 'pdf'">
                      <div class="row">
                        <div class="col-12">
                          <object :data="file.url+'#view=Fit'" width="100%" height="500">
                          </object>
                        </div>
                      </div>
                      <div class="row" style="margin-top: 5px;">
                        <div class="col-6">
                          <h5 style="margin:0;">
                            <label style="margin:0;">
                              <span class="badge badge-info">{{ file.document_type == 'DNI'? 'DNI' : 'Domicilio' }}</span>
                              &nbsp;&nbsp;
                              <i class="icon-file"></i>
                              <b>{{file.name}}</b>
                            </label>
                          </h5>
                        </div>
                        <div class="col-6">
                          <button type="button" class="btn btn-danger btn-sm" style="float: right;"  aria-label="Close" @click="DeleteFile(index)" title="">
                            Remover Archivo
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <a v-if="files_upload.length > 1" class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                  <span class="carousel-control-prev-icon bg-info" style="padding: 15px; border-radius: 35%;" aria-hidden="true"></span>
                  <span class="sr-only">Previous</span>
                </a>
                <a v-if="files_upload.length > 1" class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                  <span class="carousel-control-next-icon bg-info" style="padding: 15px; border-radius: 35%;" aria-hidden="true"></span>
                  <span class="sr-only">Next</span>
                </a>
                <center v-if="files_upload.length == 0">
                  <h2>
                    <label>
                      No ha cargado ningun archivo
                    </label>
                  </h2>
                </center>
              </div>
            </div>
          </div>
          <center>
            <button type="button" class="btn btn-success" @click="kycUpload(true)">Subir Archivos</button>
          </center>
        </div>
      </div>
    </div>
  </div>`,
  props: ['user'],
  data: function(){
    return {
     Styles : {
        marginBottom : {
          'margin-bottom' : '15px'
        },
        marginTop : {
          'margin-top' : '15px'
        },
        scrollx : {
          //'overflow-x' : 'auto',
          //'white-space' : 'nowrap',
           display : 'none'
        },

        progress : 0
      },
      kyc_status : this.user.kyc_status,
      kyc_files:[],
      files_upload:[],
      document_type : null
    }
  },
  created(){
    data.component_kyc_upload = this;
  },
  methods:{
    kycType : function(kycType){

    },
    kycUpload : function (event = null){

      if(event==null){
        $("#modalTypeKYC").modal('show');
      }else{

        if (this.kyc_files.length == 0) {
          Swal.fire({
            icon: 'warning',
            title: 'Debes subir al menos un archivo'
          });
          return;
        }
        swal.showLoading();

        var formData = new FormData();
        for(var i = 0; i < this.kyc_files.length; i++ ){
         formData.append('type_'+i,this.kyc_files[i].document_type)
         formData.append('file_'+i,this.kyc_files[i])
         //console.log(this.kyc_files[i]);
        }

        axios.post(
        getApiURL() + '/kyc_upload',
         formData,
        {
          'Content-Type': 'multipart/form-data'
        })
        .then(response => {
          if(response.data.response == 'OK'){
            Swal.fire({
              icon: 'success',
              title: 'Registro de documentos exitoso',
              text:  'En breve soporte verificara la información'
            })
             this.kyc_status = 'E';
          }
        })
        .catch(error => {
          if(error.response.data.error.code == 0){
            Swal.fire({
              icon: 'error',
              title: 'Archivo no soportado',
              text:  'El archivo seleccionado debe pesar menos de 2MB.'
            })
          }else{
            alert("Ha ocurrido un error");
          }
          //console.log(error.response.data)
        });
      }
    },
    getFile: function(){

      for(var i = 0; i < this.$refs.files_upload.files.length; i++ ){
        this.$refs.files_upload.files[i].document_type = this.document_type;
        this.kyc_files.push(this.$refs.files_upload.files[i]);
        this.files_upload.push({
          name: this.$refs.files_upload.files[i].name,
          type: this.$refs.files_upload.files[i].type,
          document_type: this.document_type,
          url: URL.createObjectURL(this.$refs.files_upload.files[i])
        });
      }
      this.document_type = null;
      this.Styles.scrollx.display = 'block';
    },
    DeleteFile: function(index){
      this.files_upload.splice(index, 1);
      this.kyc_files.splice(index, 1);
      if(this.files_upload.length == 0){
        this.Styles.scrollx.display = 'none';
      }
      $(".carousel-item").eq(0).addClass('active');
    }
  }
});

Vue.component('modal-kyctype',
{
  template:`
  <div class="modal fade" id="modalTypeKYC" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">Elija el tipo de documento</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="form-check">
            <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" @click="kycType('DNI')">
            <label class="form-check-label">
              Documento de identidad - Debe ser el documento donde especifique su numero de DNI.
            </label>
          </div>
          <br>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2" @click="kycType('domicilio')">
            <label class="form-check-label">
              Documento de domicilio - Puede ser cualquier documento donde se especifique su domicilio.
            </label>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
  `,
  data: function(){
    return {
     Styles : {
        marginBottom : {
          'margin-bottom' : '15px'
        },
        marginTop : {
          'margin-top' : '15px'
        },
        scrollx : {
          //'overflow-x' : 'auto',
          //'white-space' : 'nowrap',
           display : 'none'
        },
        progress : 0
      }
    }
  },
  methods:{
    kycType : function (type){
      data.component_kyc_upload.document_type = type
      $("#modalTypeKYC").modal('hide');
      $('#file-kyc-input').click();
    }
  }
});

Vue.component('kyc-modal',
{
  template:`
<div>
  <div class="modal fade" id="kyc-modal">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title" style="color:#000">
            Revisión de documentos KYC
          </h4>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body" >
          <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12">
              <center>
                <img :src="'`+getApiURL()+`/img/profiles/'+user.imagen" style="border: 1px solid rgb(255, 168, 0) ; border-radius:50%; width:200px; height:200px;"><br>
                <p id="nombre"></p>
              </center>
            </div>
          </div>
          <div :style="Styles.marginBottom" class="row">
            <div class="col-lg-12 col-md-12 col-sm-12">
              <div class="card">
                <div class="card-body">
                  <div class="row">
                    <div class="col-lg-6 col-md-6 col-sm-6">
                      <h4>
                        <label>
                          Nombre y Apellido
                          <br>
                          <strong>
                            {{user.name ? user.name+' '+user.last_name : 'No registrado' }}
                          </strong>
                        </label>
                      </h4>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-6">
                      <h4 style="float:right">
                        <label>
                          Fecha de Envio
                          <br>
                          <strong>
                            {{user.kyc_documents ? new Date(user.kyc_documents[0].created_at).toLocaleDateString('es-ES') : ''}}
                          </strong>
                        </label>
                      </h4>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-12 col-md-12 col-sm-12">
                      <h4>
                        <label>
                          Nombre de usuario
                          <br>
                          <strong>
                            {{user.user_name ? user.user_name : ''}}
                          </strong>
                        </label>
                      </h4>
                    </div>
                    <div class="col-lg-12 col-md-12 col-sm-12">
                      <h4>
                        <label>
                          Paquete
                          <br>
                          <strong>
                            {{user.current_level ? 'Nivel '+user.current_level.id+' - '+user.current_level.name+' '+user.current_level.value.toLocaleString('de-DE')+' '+user.current_level.currency : ''}}
                          </strong>
                        </label>
                      </h4>
                    </div>
                  </div>
                </div>
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                  <li class="nav-item">
                    <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Documento de identificación</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Documentos de domicilio</a>
                  </li>
                </ul>
                <div class="tab-content" id="myTabContent">
                  <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                    <div class="card-body">
                      <h4>
                        <label>
                          Tipo y número de documento
                          <br>
                          <strong>
                            {{user.type_document || user.dni ? user.type_document +' - '+user.dni : 'No registrado'}}
                          </strong>
                        </label>
                      </h4>
                      <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12">
                          <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                            <ol class="carousel-indicators">
                              <li v-for="(kyc_document,index) in documents_dni" class="bg-info" data-target="#carouselExampleIndicators" v-bind:data-slide-to="index" v-bind:class="index == 0? 'active':''"></li>
                            </ol>
                            <div class="carousel-inner">
                              <div v-for="(kyc_document,index) in documents_dni" class="carousel-item" v-bind:class="index == 0? 'active':''">
                                <div class="row">
                                  <div class="col-12">
                                    <center>
                                      <a class="btn btn-success" style="margin-bottom: 5px;" :href="'kyc/'+kyc_document.file_name" :download="user.user_name+'_kyc_document_'+index">Descargar Archivo</a>
                                    </center>
                                    <object :data="'kyc/'+kyc_document.file_name+'#view=Fit'" width="100%" height="500"></object>
                                  </div>
                                  <!--<img src="https://i.ytimg.com/vi/lfmCEBZkB8c/maxresdefault.jpg" class="d-block w-100" alt="...">-->
                                </div>
                              </div>
                            </div>
                            <a v-if="documents_dni?.length > 1" class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                              <span class="carousel-control-prev-icon bg-info" style="padding: 15px; border-radius: 35%;" aria-hidden="true"></span>
                              <span class="sr-only">Previous</span>
                            </a>
                            <a v-if="documents_dni?.length > 1" class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                              <span class="carousel-control-next-icon bg-info" style="padding: 15px; border-radius: 35%;" aria-hidden="true"></span>
                              <span class="sr-only">Next</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                    <div class="card-body">
                      <div class="row no-gutters">
                        <div class="col-lg-12 col-md-12 col-sm-12">
                          <h4>
                            <label>
                              Dirección
                              <br>
                              <strong>
                                {{user.direction ? user.direction : 'No registrado'}}
                              </strong>
                            </label>
                          </h4>
                        </div>
                      </div>
                      <div class="row no-gutters">
                          <div class="col-lg-6 col-md-6 col-sm-6">
                            <h4>
                              <label>
                                Pais
                                <br>
                                <strong>
                                  {{user.country_name ? user.country_name : 'No registrado'}}
                                </strong>
                              </label>
                            </h4>
                          </div>
                          <div class="col-lg-6 col-md-6 col-sm-6">
                            <h4>
                              <label>
                                Estado o Provincia
                                <br>
                                <strong>
                                  {{user.state_name ? user.state_name : 'No registrado'}}
                                </strong>
                              </label>
                            </h4>
                          </div>
                      </div>
                      <div class="row no-gutters">
                        <div class="col-lg-12 col-md-12 col-sm-12">
                          <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                            <ol class="carousel-indicators">
                              <li v-for="(kyc_document,index) in documents_address" class="bg-info" data-target="#carouselExampleIndicators" v-bind:data-slide-to="index" v-bind:class="index == 0? 'active':''"></li>
                            </ol>
                            <div class="carousel-inner">
                              <div v-for="(kyc_document,index) in documents_address" class="carousel-item" v-bind:class="index == 0? 'active':''">
                                <div class="row">
                                  <div class="col-12">
                                    <center>
                                      <a class="btn btn-success" style="margin-bottom: 5px;" :href="'kyc/'+kyc_document.file_name" :download="user.user_name+'_kyc_document_'+index">Descargar Archivo</a>
                                    </center>
                                    <object :data="'kyc/'+kyc_document.file_name+'#view=Fit'" width="100%" height="500"></object>
                                  </div>
                                  <!--<img src="https://i.ytimg.com/vi/lfmCEBZkB8c/maxresdefault.jpg" class="d-block w-100" alt="...">-->
                                </div>
                              </div>
                            </div>
                            <a v-if="documents_address?.length > 1" class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                              <span class="carousel-control-prev-icon bg-info" style="padding: 15px; border-radius: 35%;" aria-hidden="true"></span>
                              <span class="sr-only">Previous</span>
                            </a>
                            <a v-if="documents_address?.length > 1" class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                              <span class="carousel-control-next-icon bg-info" style="padding: 15px; border-radius: 35%;" aria-hidden="true"></span>
                              <span class="sr-only">Next</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" @click="refuse_kyc">Rechazar</button>
          <button type="button" class="btn btn-primary" @click="accept_kyc">Aceptar</button>
        </div>
      </div>
    </div>
  </div>
</div>
`,
 data() {
    return {
      Styles : {
        marginBottom : {
          'margin-bottom' : '15px'
        },
        marginTop : {
          'margin-top' : '15px'
        }
      },
      user:{}
    }
  },
  created(){
    data.component_kyc_modal = this;
  },
  computed : {
    documents_dni : function(){
      return this.user.kyc_documents.filter(function (document) {
        return document.document_type === 'DNI'
      })
    },
    documents_address : function(){
      return this.user.kyc_documents.filter(function (document) {
        return document.document_type === 'domicilio'
      })
    }
  },
  methods:{
    refuse_kyc : function () {
      swal.showLoading();
      Swal.fire({
        width: 600,
        title: 'Confirmación',
        icon: 'warning',
        text: 'Esta a punto de rechazar los documentos del usuario '+this.user.name+' '+this.user.last_name,
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return  axios.put(getApiURL() + '/refuse_kyc',{user_id : this.user.id})
          .then(response => {
            if (response.status != '200') {
              throw new Error(response.statusText)
            }
            return response.data;
          })
         .catch(error => {
           Swal.showValidationMessage(
             `Request fail: ${error}`
           )
         });
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then(result => {
          if(result.value){
            Swal.fire({
            width: 650,
            icon: 'success',
            title: 'Rechazo de archivo exitoso'
          })
          data.component_kyc_panel.get_kyc_document();
          $("#kyc-modal").modal("hide");
          }
      });
    },
    accept_kyc : function () {
      swal.showLoading();
      Swal.fire({
        width: 600,
        title: 'Confirmación',
        icon: 'info',
        text: 'Esta a punto de aprobar los documentos del usuario '+this.user.name+' '+this.user.last_name,
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return axios.put(getApiURL() + '/accept_kyc', {user_id : this.user.id})
          .then(response => {
            if (response.status != '200') {
              throw new Error(response.statusText)
            }
            return response.data;
          })
         .catch(error => {
           Swal.showValidationMessage(
             `Request fail: ${error}`
           )
         });
        },
        allowOutsideClick: () => !Swal.isLoading()
        }).then(result => {
          if(result.value){
            Swal.fire({
            width: 650,
            icon: 'success',
            title: 'Aceptación de archivo exitoso'
          });
          data.component_kyc_panel.get_kyc_document();
          $('#kyc-modal').modal('hide');
        }
      });
    }
  }
});

Vue.component('kyc-panel',
{
  template:`
  <div>
    <center>
      <h3 :style="Styles.marginTop">
        <label>
          Documentos enviados
        </label>
      </h3>
    </center>
    <div class="card text-white" :style="[{'background' : '#3f4052'}, Styles.marginBottom]">
      <div class="card-body">
        <div v-if="user_documents_kyc.length > 0" class="row">
          <div v-for="kyc_document in user_documents_kyc" :style="Styles.marginBottom" class="card bg-info mb-3" style="color: white; margin-right: auto!important; margin-left: auto!important; max-width: 18rem;">
            <div class="card-header">Usuario</div>
            <div class="card-body">
              <center>
                <img :src="'`+getApiURL()+`/img/profiles/'+kyc_document.imagen" style="border:3px solid #fff ; border-radius:50%; width: 100px; height: 100px;" alt="...">
                <h3 class="card-title">
                  <label>
                    <strong>
                      {{ kyc_document.user_name }}
                    </strong>
                    <br>
                    <small class="text-muted">
                      {{ kyc_document.name+' '+kyc_document.last_name }}
                    </small>
                  </label>
                </h3>
                <h4>
                  <label>
                    Fecha de Envio {{new Date(kyc_document.kyc_documents[0].created_at).toLocaleDateString('es-ES')}}
                  </label>
                </h4>
              </center>
            </div>
            <center>
              <button type="button" class="col-12 btn btn-success" @click="kyc_modalShow(kyc_document)" data-toggle="modal" data-target="#kyc-modal">Revisar documentos</button>
            </center>
          </div>
        </div>
        <div v-else class="row">
          <div :style="Styles.marginBottom" class="card bg-secondary mb-3" style="color: white; margin-right: auto!important; margin-left: auto!important; max-width: 25rem;">
            <div class="card-header">Sin registros</div>
            <div class="card-body">
              <center>
                <h4 class="card-title">
                  <p class="card-text">
                    No hay documentos enviados
                  </p>
                </h4>
              </center>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`,
  data() {
    return {
      Styles : {
        marginBottom : {
          'margin-bottom' : '15px'
        },
        marginTop : {
          'margin-top' : '15px'
        }
      },
      user_documents_kyc : []
    }
  },
  created(){
    data.component_kyc_panel = this;
    this.get_kyc_document();
  },
  methods:{
    get_kyc_document : function () {
      axios.get(getApiURL() + '/get_kyc_document')
       .then(response => {
         this.user_documents_kyc = response.data.data;
       })
       .catch(error => {
        alert("Ha ocurrido un error")
        //console.log(error);
      });
    },
    kyc_modalShow : function (kyc_document) {
      data.component_kyc_modal.user = kyc_document;
    }
  }
});

Vue.component('upload-link-advertisings-modal',
{
  template:`
  <div class="modal fade" id="upload-modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title" style="margin:0;">
            Agregar Campaña Publicitaria
          </h4>
          <button type="button" id="close_modal_upload" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body" >
          <!--<label>Titulo de la campaña</label>
          <input type="text" class="form-control" v-model="title" placeholder=""  >-->
          <h5>
            <label>
              Link de la campaña
            </label>
          </h5>
          <input type="text" class="form-control" v-model="link" v-on:blur="getTitle()" placeholder=""  >
          <div :style="Styles.link">
            <h4>
              <a :href="link" target="_black" class="badge badge-info" style="white-space: inherit;">
                  {{response_link ?? ''}}
              </a>
            </h4>
          </div>
          <h5>
            <label>
              Descripción de la campaña
            </label>
          </h5>
          <input type="text" class="form-control" v-model="description" placeholder=""  >
          <div class="row">
            <div class="col-8">
              <h5>
                <label>
                  Imagen de la campaña
                </label>
              </h5>
            </div>
            <div class="col-4">
              <button style="float:right!important" class="btn btn-primary btn-sm" @click="updateFile()">Cargar Archivo</button>
            </div>
          </div>
          <input id="file-input" name="file-input" type="file"  ref="file"  @change="getFile()" accept="image/*" style="display: none"/>
          <div class="col-md-12 col-sm-12">
            <div class="card">
              <div class="card-body" v-if="Styles.scrollx.display == 'none'">
                <center>
                  <i class="icon-picture icon-4x" style="color: #5a5d60;"></i>
                </center>
              </div>
              <div class="card-body" :style="Styles.scrollx">
                <img :src="file.url" height="500px" width="100%" style="margin-bottom: 2px;">
                <i class="icon-file"></i><b>{{file.name}}</b>
                <button type="button" class="btn btn-sm btn-danger" style="float: right;"  aria-label="Close" @click="DeleteFile()" title="">
                    Remover
                    <span aria-hidden="true">&times;</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button  type="button" class="btn btn-primary" @click="updateFile(true)">Enviar</button>
        </div>
      </div>
    </div>
  </div>
`,
  data() {
    return {
      Styles : {
        marginBottom : {
          'margin-bottom' : '15px'
        },
        scrollx : {
           display : 'none'
        },
        link : {
           display : 'none',
           'white-space': 'none !important'
        },
        progress : 0
      },
      link : null,
      description : null,
      file : [],
      advertising_file: [],
      response_link : null
    }
  },
  created(){
  //data.component_modal_upload = this;
  },
  methods:{
    updateFile : function (event = null){
      if(event==null){
        $('#file-input').click();
      }else{
        if(this.description == null ){
          Swal.fire({
            width: 650,
            icon: 'error',
            title: 'Por favor llenar el campo descripción'
          });
          return;
        }
        if(this.link == null ){
          Swal.fire({
            width: 650,
            icon: 'error',
            title: 'Por favor llenar el campo link'
          });
          return;
        }

        var formData = new FormData();

        Swal.showLoading();

        formData.append('link',this.link);
        formData.append('description',this.description);
        formData.append('file',this.advertising_file);
        /*for(var i = 0; i < this.promotion_files.length; i++ ){
         formData.append('file_'+i,this.promotion_files[i])

        }*/

        axios.post(
        getApiURL() + '/upload_advertising',
        formData,
        {
          'Content-Type': 'multipart/form-data'
        })
        .then(response => {
          Swal.fire({
            width: 650,
            icon: 'success',
            title: 'Campaña publicitaria registrada exitosamente'
          })
          $('#close_modal_upload').click();
          data.component_link_advertising.get_link_advertising();
        })
        .catch(error => {

          if(error.response.data.error.status_code == 422){
                var error = error.response.data.error.message;
                var message_error = '';
                $.each(error, function( key, value ) {
                  message_error += value+'<br>';
                  error[key] = value;
                });

              Swal.fire({
                width: 650,
                icon: 'error',
               // title: 'Error en el formulario',
                html: message_error,
              });
            }
          // alert("Ha ocurrido un error");
        });
      }
    },
    getFile: function(){
     this.advertising_file = this.$refs.file.files[0];

     this.file = {
          name: this.$refs.file.files[0].name,
          type: this.$refs.file.files[0].type,
          url : URL.createObjectURL(this.$refs.file.files[0])
     };

      /*for(var i = 0; i < this.$refs.files.files.length; i++ ){
        this.promotion_files.push(this.$refs.files.files[i]);
        this.files.push({
          name: this.$refs.files.files[i].name,
          type: this.$refs.files.files[i].type,
          url : URL.createObjectURL(this.$refs.files.files[i])
        });
      }*/
      this.Styles.scrollx.display = 'block';
    },
    getTitle: function() {
       axios.post(getApiURL()+'/get_title_link',{url : this.link})
       .then(response => {
         this.response_link = response.data.data;
         this.Styles.link.display = 'block';
       })
       .catch(error => {
        if (typeof error.response.data.error.status_code) {
            if(error.response.data.error.status_code == 422){

                var error = error.response.data.error.message;
                var message_error = '';
                $.each(error, function( key, value ) {
                  message_error += value+'<br>';
                  error[key] = value;
                });
                Swal.fire({
                  width: 650,
                  icon: 'error',
                  title: 'Error!!',
                  html: message_error,
                });
            }
          }
      });
    },
    DeleteFile: function(){
      this.Styles.scrollx.display = 'none';
      //this.file = null;
      //this.advertising_file = null;
      /*this.file.splice(index, 1);
      this.advertising_file.splice(index, 1);
      if(this.file.length == 0){
        this.Styles.scrollx.display = 'none';
      }*/
    }
  }
});

Vue.component('panel-link-advertisings',
{
  template:`
  <div class="card text-white" style="background:#3f4052;">
    <div class="card-body">
      <button :style="Styles.marginBottom" data-toggle="modal" data-target="#upload-modal" class="btn btn-primary" style="margin-left: 83%;">+ Agregar Campaña</button>
      <div class="row">
        <div v-for="(link_advertising,key) in link_advertisings" class="card bg-primary mb-3" style="margin-left: auto!important;margin-right: auto!important;color: white; width: 32rem;">
          <div class="card-header">
            <h4 style="margin:0">
              <label style="margin:0">
                {{link_advertising.title}}
              </label>
            </h4>
          </div>
          <div class="card-body">
          <center>
            <img :src="'`+getApiURL()+`/advertising_files/'+link_advertising.imagen" style="width:350px; height:350px;" >

            <h5 class="card-title">
              <a class="badge badge-light" :href="link_advertising.link" target="_black">{{link_advertising.link}}</a><br>
            </h5>
             </center>
            <p>
              {{link_advertising.description}}
            </p>
          </div>
          <button class="btn btn-success" data-toggle="modal" data-target="#edit-modal" @click="edit_link_advertising(link_advertising)">
            Modificar campaña
            <i class="fa fa-pencil fa-1x" title="Editar Campaña" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </div>
  </div>`,
  data() {
    return {
      Styles : {
        marginBottom : {
          'margin-bottom' : '15px'
        },
        progress : 0
      },
      link_advertisings : {},
      editing : []
    }
  },
  created(){
    data.component_link_advertising = this;
    this.get_link_advertising();
  },
  methods:{
    get_link_advertising : function () {
      axios.get(getApiURL()+'/get_link_advertising')
       .then(response => {
         this.link_advertisings = response.data.data;
       })
       .catch(error => {
        alert("Ha ocurrido un error")
        //console.log(error);
      });
    },
    edit_link_advertising : function (link_advertising) {
      data.component_modal_edit_advertising.description = link_advertising.description;
      data.component_modal_edit_advertising.advertising_id = link_advertising.id;
      data.component_modal_edit_advertising.link = link_advertising.link;
      data.component_modal_edit_advertising.file = {
          name: link_advertising.link,
          type: 'image',
          url : getApiURL()+'/advertising_files/'+link_advertising.imagen
      };
      data.component_modal_edit_advertising.getTitle();
      data.component_modal_edit_advertising.response_link = 'Cargando...';
      data.component_modal_edit_advertising.advertising_file = null;
    }
  }
});

Vue.component('edit-link-advertisings-modal',
{
  template:`
  <div class="modal fade" id="edit-modal">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title" style="margin:0;">
            Editar Campaña Publicitaria
          </h4>
          <button type="button" id="close_modal_edit" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <h4>
          <a class="badge badge-warning" style="white-space: inherit;">
              Información: Puede modificar la campaña publicitaria solo 3 veces por mes.
          </a>
        </h4>
        <div class="modal-body" >
          <!--<label>Titulo de la campaña</label>
          <input type="text" class="form-control col-6" v-model="title" placeholder=""  >-->
          <div class="row">
            <div class="col-12">
              <h4>
                <label>
                  Link de la campaña
                </label>
              </h4>
              <input type="text" class="form-control col-6" v-model="link" v-on:blur="getTitle()" placeholder=""  >
            </div>
          </div>
          <div :style="Styles.link">
            <h4>
              <a :href="link" target="_black" class="badge badge-info" style="white-space: inherit;">
                {{response_link ?? 'Cargando...'}}
              </a>
            </h4>
          </div>
          <h4>
            <label>
              Descripción de la campaña
            </label>
          </h4>
          <input type="text" class="form-control" v-model="description" placeholder=""  >
          <div class="row">
            <div class="col-8">
              <h5>
                <label>
                  Imagen de la campaña
                </label>
              </h5>
            </div>
            <div class="col-4">
              <button style="float:right!important" class="btn btn-primary btn-sm" @click="updateFile()">Cargar Archivo</button>
            </div>
          </div>
          <input id="file-input-edit" name="file-input" type="file"  ref="file"  @change="getFile()" accept="image/*" style="display: none" />
          <div class="col-md-12 sm-12">
            <div class="card">
              <div class="card-body" v-if="Styles.scrollx.display == 'none'">
                <center>
                  <i class="icon-picture icon-4x" style="color: #5a5d60;"></i>
                </center>
              </div>
              <div class="card-body" :style="Styles.scrollx">
                <img :src="file.url" height="500px" width="100%" style="margin-bottom: 2px;">
                <i class="icon-file"></i><b>{{file.name}}</b>
                <button type="button" class="btn btn-sm btn-danger" style="float: right;"  aria-label="Close" @click="DeleteFile()" title="">
                    Remover
                    <span aria-hidden="true">&times;</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="updateFile(true)">Modificar</button>
          <button type="button" class="btn btn-danger" @click="deleteLink()">Eliminar</button>
        </div>
      </div>
    </div>
  </div>`,
  data() {
    return {
      Styles : {
        marginBottom : {
          'margin-bottom' : '15px'
        },
        scrollx : {
           display : 'block'
        },
        link : {
           display : 'block',
           'white-space': 'none !important'
        },
        progress : 0
      },
      link : null,
      description : null,
      file : {
        name : null,
        type:null,
        url:null
      },
      advertising_file: null,
      response_link : null,
      advertising_id : null
    }
  },
  created(){

  data.component_modal_edit_advertising = this;
  },
  methods:{
    updateFile : function (event = null){
      if(event==null){
        $('#file-input-edit').click();
      }else{
        if(this.description == null ){
          Swal.fire({
            width: 650,
            icon: 'error',
            title: 'Por favor llenar el campo descripcion'
          });
          return;
        }
        if(this.link == null ){
          Swal.fire({
            width: 650,
            icon: 'error',
            title: 'Por favor llenar el campo link'
          });
          return;
        }

        var formData = new FormData();

        Swal.showLoading();

        formData.append('link',this.link);
        formData.append('description',this.description);
        formData.append('file',this.advertising_file);

        axios.post(
        getApiURL() + '/edit_advertising/'+this.advertising_id,
        formData,
        {
          'Content-Type': 'multipart/form-data'
        })
        .then(response => {
          Swal.fire({
            width: 650,
            icon: 'success',
            title: 'Campaña Publicitaria modificada exitosamente'
          })
          data.component_link_advertising.get_link_advertising();
        })
        .catch(error => {

          if(error.response.data.error.status_code == 422){
                var error = error.response.data.error.message;
                var message_error = '';
                $.each(error, function( key, value ) {
                  message_error += value+'<br>';
                  error[key] = value;
                });
              Swal.fire({
                width: 650,
                icon: 'error',
                html: message_error,
              });
            }
        });
      }
    },
    getFile: function(){
     this.advertising_file = this.$refs.file.files[0];

     this.file = {
          name: this.$refs.file.files[0].name,
          type: this.$refs.file.files[0].type,
          url : URL.createObjectURL(this.$refs.file.files[0])
     };
    this.Styles.scrollx.display = 'block';
    },
    getTitle: function() {
       axios.post(getApiURL()+'/get_title_link',{url : this.link})
       .then(response => {
         this.response_link = response.data.data;
         this.Styles.link.display = 'block';
       })
       .catch(error => {
        if (typeof error.response.data.error.status_code) {
            if(error.response.data.error.status_code == 422){

                var error = error.response.data.error.message;
                var message_error = '';
                $.each(error, function( key, value ) {
                  message_error += value+'<br>';
                  error[key] = value;
                });
                Swal.fire({
                  width: 650,
                  icon: 'error',
                  title: 'Error!!',
                  html: message_error,
                });
            }
          }
      });
    },
    DeleteFile: function(){
      this.Styles.scrollx.display = 'none';
    },
    deleteLink: function(){

      Swal.fire({
        width: 600,
        title: 'Confirmación',
        icon: 'warning',
        text: 'Esta a punto de eliminar la campaña publicitaria: '+this.response_link,
        //html: 'Se va Eliminar campaña Publicitaria:'+this.response_link,
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return axios.delete(getApiURL()+'/delete_link/'+this.advertising_id)
          .then(response => {
            if (response.status != '200') {
              throw new Error(response.statusText)
            }
            return response.data.data;
          })
          .catch(error => {
            //console.log(error.status )
            if(error.response.data.error.status_code == '422'){
              Swal.showValidationMessage(
                 `${error.response.data.error.message.error}`
               )
            }else{
                Swal.showValidationMessage(
                 `Request fail: ${error}`
               )
            }
         });
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then(result => {
        if(result.value){
           Swal.fire({
            width: 650,
            icon: 'success',
            title: 'Campaña publicitaria eliminada exitosamente'
          })
           $('#close_modal_edit').click();
          data.component_link_advertising.get_link_advertising();
        }
      });
    }
  }
});

//COMPONENTES NUEVOS
Vue.component('user-manages',
{
  template:`
  <div>
    <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
      <li class="nav-item">
        <a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">Cuentas de usuarios</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">Verificación de cuentas y upgrades</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" id="pills-membership-tab" data-toggle="pill" href="#pills-membership" role="tab" aria-controls="pills-membership" aria-selected="false">Activación de membresias</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" id="pills-kyc-verification-tab" data-toggle="pill" href="#pills-kyc-verification" role="tab" aria-controls="pills-kyc-verification" aria-selected="false">Verificación de KYC</a>
      </li>
    </ul>
    <div class="tab-content" id="pills-tabContent">
      <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
        <edit-user></edit-user>
      </div>
      <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
        <nav>
          <div class="nav nav-tabs" id="nav-tab" role="tablist">
            <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Verificación de nuevos ingresos y renovaciones</a>
            <a class="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Verificación de upgrades</a>
          </div>
        </nav>
        <div class="tab-content" id="nav-tabContent">
          <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
            <unverified-plans-panel></unverified-plans-panel>
          </div>
          <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
            <unverified-upgrades></unverified-upgrades>
          </div>
        </div>
      </div>
      <div class="tab-pane fade show" id="pills-membership" role="tabpanel" aria-labelledby="pills-membership-tab">
        <ul class="nav nav-tabs">
            <li><a class=" btn btn-link" data-toggle="tab" href="#insolvents-users-panel">Lista de usuarios inactivos</a></li>
            <li><a class=" btn btn-link" data-toggle="tab" href="#solvent-user-panel">Renovar membresia a usuario activo</a></li>
          </ul>
          <div class="tab-content">
          <div class="tab-pane active" id="insolvents-users-panel">
             <insolvents-users-panel></insolvents-users-panel>
          </div>
          <!--/tab-pane-->
          <div class="tab-pane" id="solvent-user-panel">
            <solvent-user-panel></solvent-user-panel>
          </div><!--/tab-pane-->
        </div>
      </div>
      <div class="tab-pane fade" id="pills-kyc-verification" role="tabpanel" aria-labelledby="pills-kyc-verification-tab">
        <kyc-panel></kyc-panel>
      </div>
    </div>
  </div>`
});

Vue.component('accounting-manage',
{
  template:`
  <div>
    <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
      <li class="nav-item">
        <a class="nav-link active" id="pills-accounting-tab" data-toggle="pill" href="#pills-accounting" role="tab" aria-controls="pills-accounting" aria-selected="true">Contabilidad</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" id="pills-withdrawals-tab" data-toggle="pill" href="#pills-withdrawals" role="tab" aria-controls="pills-withdrawals" aria-selected="false">Retiros</a>
      </li>
    </ul>
    <div class="tab-content" id="pills-tabContent">
      <div class="tab-pane fade show active" id="pills-accounting" role="tabpanel" aria-labelledby="pills-accounting-tab">
        <accounting></accounting>
      </div>
      <div class="tab-pane fade show" id="pills-withdrawals" role="tabpanel" aria-labelledby="pills-withdrawals-tab">
        <withdrawals></withdrawals>
      </div>
    </div>
  </div>`
});

Vue.component('certificado-inscripcion',
{
  template:`
  <div class="container">
      <div class="row-fluid justify-content-center">
          <div class="col-md-14">
              <div class="card">
                  <!-- Default panel contents -->
                  <div class="card-header">
                      Inscripcion certificada
                  </div>
                  <div class="card-body">
                      <div class="form-group row"> <!-- Full Name -->
                          <div class="col-md-3">
                            <label class="col-form-label">Cedula del estudiante:</label>
                          </div>
                          <div class="col-md-3">
                            <input type="text" class="form-control" v-model="cedula_estudiante" placeholder="Cedula" id="cedula" name="cedula" aria-label="Cedula estudiante">
                          </div>
                      </div>
                      <div class="col-md-13">
                          <div class="card-header text-center">
                              <span style="font-weight: bold;">Carga academica del trayecto a cursar</span>
                          </div>
                          <div v-html="content_table">
                          </div>
                      </div>
                      <div class="form-group">
                          <center>
                              <button class="btn btn-primary btn-sm" id="cargar" @click="cargaAcademica">Cargar materias a cursar</button>
                          </center>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
  `,
  data() {
    return {
      Styles : {
        middleAlign : {
          'vertical-align': 'middle'
        },
        marginBottom : {
          'margin-bottom' : '15px'
        },
        marginTop : {
          'margin-top' : '15px'
        },
        scrollX : {
          'overflow-x' : 'auto',
          'white-space' : 'nowrap'
        }
      },
      cedula_estudiante : '',
      content_table : '<center>\
          <div class="col-md-8"><hr></div>\
          <h6>Pulse el boton de abajo para cargar la carga academica.</h6>\
          <div class="col-md-8"><hr></div>\
      </center>',
      materia : {
        materia : ''
      },
      deploy_form : false,
      user_type : '',
      asignaturas : [],
      paginate : ['asignaturas'],
      filtro : '',
      referer_key : '',
      materia_selected : false
    }
  },
  created(){
  },
  methods:{
    cargaAcademica : function() {

      axios.post(getApiURL()+ '/estudiante/cargaAcademica',{
        cedula_estudiante : this.cedula_estudiante
      })
      .then(response => {
        this.content_table = response.data.data[0];
        ////console.log(response.data.data);
      })
      .catch(error => {
        alert("Ha ocurrido un error")
        //console.log(error);
      });
    },
    get_materias : function() {
      axios.post(getApiURL()+ '/materia/get')
      .then(response => {
        this.asignaturas = response.data;
      })
      .catch(error => {
        alert("Ha ocurrido un error")
        //console.log(error);
      });
    },
    get_user_filter : function() {
      axios.post(getApiURL()+ '/get_user_accounts_filter',{
        filter : this.filtro
      })
      .then(response => {
        this.accounts = response.data.data;
        ////console.log(response.data.data);
      })
      .catch(error => {
        alert("Ha ocurrido un error")
        //console.log(error);
      });
    },
    get_asignatura : function(asignatura = null){
      this.cancel();
      if(asignatura.materia != ''){
        this.filtro = asignatura.materia
      }
      this.materia.id = asignatura.id;
      this.materia.materia = asignatura.materia;
      this.materia_selected = true;
    },
    register_materia : function(){

      Swal.fire({
        width: 550,
        title: 'Confirmación',
        icon: 'info',
        html: '¿Esta seguro de registrar?',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return axios.put(getApiURL() +'/materia/add', {
            materia : this.materia
          })
          .then(response => {

            if(response.status != '200') {
              throw new Error(response.statusText)
            }
            return response.data.data;
          })
         .catch(error => {

           if(error.response.data.error.status_code == '422'){
             Swal.showValidationMessage(
               `Llene el campo.`
             )
           }else{
             Swal.showValidationMessage(
               `Request fail: ${error}`
             )
           }
         });
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then(result => {
        if(result.value){
          Swal.fire({
            width: 650,
            icon: 'success',
            title: 'Registro realizado.'
          })
          this.get_materias();
          this.materia = {};
          this.deploy_form = false
        }
      })
    },
    update_materia : function(){

      Swal.fire({
        width: 600,
        title: 'Confirmación',
        icon: 'info',
        html: '¿Esta seguro de modificar esta materia?',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return axios.put(getApiURL() +'/materia/update', {
            materia : this.materia
          })
          .then(response => {

            if(response.status != '200') {
              throw new Error(response.statusText)
            }
            return response.data.data;
          })
         .catch(error => {

           if(error.response.data.error.status_code == '422'){
             Swal.showValidationMessage(
               `Verifique que el campo este rellenado.`
             )
           }else{
             Swal.showValidationMessage(
               `Request fail: ${error}`
             )
           }
         });
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then(result => {
          if(result.value){
            Swal.fire({
              width: 650,
              icon: 'success',
              title: 'Modificado correctamente.'
            })
            this.get_materias();
            this.materia = {};
            this.filtro = '';
            this.materia_selected = false;
          }
      })
    },
    delete_asignatura : function(asignatura_id){

      Swal.fire({
        width: 600,
        title: 'Confirmación',
        icon: 'warning',
        html: '¿Esta seguro de eliminar?',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return axios.post(getApiURL()+'/materia/delete', {
            asignatura_id : asignatura_id
          })
          .then(response => {
            if (response.status != '200') {
              throw new Error(response.statusText)
            }
            return response.data.data;
          })
         .catch(error => {
           Swal.showValidationMessage(
             `Request fail: ${error}`
           )
         });
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then(result => {
          if(result.value){
            Swal.fire({
              width: 650,
              icon: 'success',
              title: 'Eliminada con exito.'
            })
            this.get_materias();
            this.materia = {};
            this.materia_selected = false;
          }
      })
    },
    cancel : function(){
      this.materia = {};
      this.filtro = '';
      this.materia_selected = false;
      this.deploy_form = false;
    }
  }
});

Vue.component('pensum-module',
{
  template:`
  <div :style="Styles.marginTop">
    <center>
      <h1 class="display-4">
        Gestion de pensum academico
      </h1>
    </center>
    <div class="card bg-light mb-3" :style="Styles.marginBottom">
      <div class="card-body">
        <div class="form-group row">
          <div class="col-md-2">
            <label class="col-form-label">Carrera:</label>
          </div>
          <div class="col-md-4">
            <select v-model="id_carrera" @change="getTrayectosAca" class="form-control custom-control-inline" id="id_carrera" name="carrera">
              <option v-for="carrera in carreras" :value="carrera.id">{{ carrera.carrera }}</option>
            </select>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-md-2">
            <label class="col-form-label">Año del pensum:</label>
          </div>
          <div class="col-md-2">
            <select v-model="id_trayecto" :disabled="trayectos.length > 0? false:true" class="form-control custom-control-inline" id="id_anio" name="anio">
              <option v-for="trayecto in trayectos" :value="trayecto.id">{{ trayecto.trayecto }}</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <div class="col-md-12">
            <button class="btn btn-info btn-sm" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
              Actualizar pensum
            </button>
          </div>
        </div>
        <div class="collapse" id="collapseExample">
          <div class="card card-body">
            <div class="form-group row">
              <div class="col-md-3">
                <div class="input-group mb-3">
                  <input type="text" class="form-control" id="anio_pensum" name="anio_pensum" value="{{ date('Y') }}" aria-label="Ingreso manual" aria-describedby="button-addon2">
                  <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button" id="button-addon2" data-toggle="button" aria-pressed="false" autocomplete="off">Ingreso manual</button>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <div class="col-md-12">
                  <p style="display:inline;">- Se registrara una nueva malla curricular con el año definido arriba, se copiaran todas las asignaturas ya existentes con su carga respectiva del pensum actualmente vigente.</p>
                </div>
              </div>
              <div class="col-md-12">
                <button class="btn btn-success btn-sm">Crear nuevo pensum</button>
              </div>
            </div>
          </div>
        </div>
        <div class="form-group"></br>
          <div class="col-md-12">
            <button class="btn btn-primary btn-sm" @click="openModal">Ingresar materia</button>
            <p style="display:inline;">- Añada una nueva materia a la malla curricular.</p>
          </div>
        </div>
        <div class="col-md-13">
          <div class="card-header text-center">
            Pensum
          </div>
          <div v-html="html_content">
          </div>
        </div>
        <div class="form-group">
          <center>
            <button class="btn btn-primary btn-sm" id="cargar" @click="cargarAsignaturas">Cargar pensum</button>
          </center>
        </div>
      </div>
  </div>
  `,
  data() {
    return {
      Styles : {
        middleAlign : {
          'vertical-align': 'middle'
        },
        marginBottom : {
          'margin-bottom' : '15px'
        },
        marginTop : {
          'margin-top' : '15px'
        },
        scrollX : {
          'overflow-x' : 'auto',
          'white-space' : 'nowrap'
        }
      },
      id_carrera : '',
      id_trayecto : '',
      carreras : [],
      trayectos : [],
      html_content : '<center>\
                        <div class="col-md-8"><hr></div>\
                          <h6>Seleccione carrera para cargar la malla curricular</h6>\
                        <div class="col-md-8"><hr></div>\
                      </center>'
    }
  },
  created(){
    data.component_pensum_module = this
    this.getCarreras()
  },
  methods:{
    getCarreras : function(){

      axios.post(getApiURL()+'/carrera/registradas')
      .then(response => {
          this.carreras = response.data.data;
      })
      .catch(error => {

      });
    },
    getTrayectosAca : function(){

      axios.post(getApiURL()+'/trayecto/dinamic_list',{
        id_carrera : this.id_carrera
      })
      .then(response => {
          this.trayectos = response.data.data;
      })
      .catch(error => {

      });
    },
    cargarAsignaturas : function(){

      axios.post(getApiURL()+'/pensum/get_asigs_pensum',{
        id_carrera : this.id_carrera
      })
      .then(response => {
          this.html_content = response.data.data.content;
      })
      .catch(error => {

      });
    },
    openModal : function(){

      data.component_modal_add_pensum.trayecto = this.trayectos.find(t => t.id == this.id_trayecto)
      data.component_modal_add_pensum.carrera = this.carreras.find(c => c.id == this.id_carrera)
      data.component_modal_add_pensum.pensum.id_trayecto = this.trayectos.find(t => t.id == this.id_trayecto).id
      $('#AddPensumModal').modal('show');
    },
    cancel : function(){
      this.materia = {};
      this.filtro = '';
      this.materia_selected = false;
      this.deploy_form = false;
    }
  }
});

Vue.component('modal-add-pensum',
{
  template:`
  <div class="modal fade" id="AddPensumModal" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalCenterTitle">Incluir materia al pensum</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="form-horizontal">
            <div class="form-group"> <!-- Full Name -->
              <center>
                <div id="head_estudiante" class="col-md-12">
                  <h1 class="display-4">
                    Trayecto: {{ trayecto.trayecto }}
                  </h1>
                </div>
                <label class="col-md-12 col-form-label col-form-label-lg">
                  {{ carrera.carrera }}
                </label>
              </center>
            </div>
            <div class="form-group row">
              <div class="col-md-3">
                <label class="col-form-label">Materia:</label>
              </div>
              <div class="col-md-4">
                <select v-model="id_materia" v-model="pensum.id_materia" :disabled="button_toggle? true:false" class="form-control custom-control-inline" id="id_materia" name="materia">
                  <option v-for="materia in materias" :value="materia.id">{{ materia.materia }}</option>
                </select>
              </div>
            </div>
            <div class="form-group row"> <!-- Full Name -->
              <div class="col-md-3">
                <label class="col-form-label">Codigo de asignatura:</label>
              </div>
              <div class="col-md-4">
                <input type="text" v-model="pensum.cod_asignatura" class="form-control" id="cod_asignatura" name="cod_asignatura" placeholder="Codigo de la asignatura">
              </div>
            </div>
            <div class="form-group row"> <!-- Full Name -->
              <div class="col-md-3">
                <label class="col-form-label">Denominación de asignatura:</label>
              </div>
              <div class="col-md-8">
                <div class="input-group mb-3">
                  <input type="text" v-model="pensum.denominacion_asignatura" :disabled="button_toggle? true:false" class="form-control" placeholder="Denominacion a la asignatura" id="desc_asignatura" name="desc_asignatura" aria-label="Denominación de la asignatura" aria-describedby="button-addon2">
                  <div class="input-group-append">
                    <button :class="{'active' : button_toggle, 'btn' : true, 'btn-outline-secondary' : true}" type="button" @click="denominacion_toggle" id="button-addon2" data-toggle="button" aria-pressed="false" autocomplete="off">Denominación por defecto</button>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-group row">
              <div class="col-md-3">
                <label class="col-form-label">Caracter de la UC:</label>
              </div>
              <div class="col-md-2">
                <input type="text" v-model="pensum.caracter_uc" class="form-control" id="caracter_uc" name="caracter_uc" maxlength="2">
              </div>
            </div>
            <div class="form-group row">
              <div class="col-md-4">
                <label class="col-form-label">Horas practicas semanales:</label>
                <div>
                  <input type="number" v-model="pensum.hps" maxlength="2" min="1" step="1" class="form-control" id="hps" style="text-align: center; width: 70px;border:1px #aaa solid;">
                </div>
              </div>
              <div class="col-md-4">
                <label class="col-form-label">Horas totales:</label>
                <div>
                  <input type="number" :value="pensum.hps * 36" class="form-control" id="ht" readonly="readonly" style="text-align: center; width: 70px;border:1px #aaa solid;" maxlength="3">
                </div>
              </div>
              <div class="col-md-4">
                <label class="col-form-label">UC:</label>
                <div>
                  <input type="number" v-model="pensum.uc" class="form-control" id="uc" style="padding: 0;text-align: center; width: 60px;border:1px #aaa solid;" maxlength="2">
                </div>
              </div>
            </div>
            <div class="form-group row">
              <div class="col-md-3">
                <label class="col-form-label">prelaciones:</label>
              </div>
            </div>
            <div class="form-group row">
              <div class="col-md-3">
                <select multiple class="form-control" id="prelaciones" name="prelaciones">
                  <option selected disabled>Prelaciones</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" @click="incluirAsignatura" class="btn btn-primary">Incluir</button>
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
  `,
  data() {
    return {
      Styles : {
        middleAlign : {
          'vertical-align': 'middle'
        },
        marginBottom : {
          'margin-bottom' : '15px'
        },
        marginTop : {
          'margin-top' : '15px'
        },
        scrollX : {
          'overflow-x' : 'auto',
          'white-space' : 'nowrap'
        }
      },
      carrera : {
        id : ''
      },
      trayecto : {
        id : ''
      },
      pensum : {
        id_trayecto : '',
        id_materia : '',
        cod_asignatura : '',
        denominacion_asignatura : '',
        caracter_uc : '',
        hps : 0,
        ht : 0,
        uc : ''
      },
      materias : [],
      button_toggle : false,
    }
  },
  created(){
    data.component_modal_add_pensum = this
    this.getMaterias()
  },
  methods:{
    getMaterias : function(){

      axios.post(getApiURL()+'/materia/list')
      .then(response => {
          this.materias = response.data.data;
      })
      .catch(error => {

      });
    },
    getTrayectosAca : function(){

      axios.post(getApiURL()+'/trayecto/dinamic_list',{
        id_carrera : this.id_carrera
      })
      .then(response => {
          this.trayectos = response.data.data;
      })
      .catch(error => {

      });
    },
    incluirAsignatura : function(){

      this.pensum.ht = this.pensum.hps * 36

      Swal.fire({
        width: 550,
        title: 'Confirmación',
        icon: 'info',
        html: '¿Esta seguro de crear esta asignatura?',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return axios.put(getApiURL() +'/pensum/add', {
            pensum : this.pensum
          })
          .then(response => {

            if(response.status != '200') {
              throw new Error(response.statusText)
            }
            return response.data.data;
          })
         .catch(error => {

           if(error.response.data.error.status_code == '422'){
             Swal.showValidationMessage(
               `Llene el campo.`
             )
           }else{
             Swal.showValidationMessage(
               `Request fail: ${error}`
             )
           }
         });
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then(result => {
        if(result.value){
          Swal.fire({
            width: 650,
            icon: 'success',
            title: 'Registro realizado.'
          })
          this.pensum = {};
          this.button_toggle = false
          data.component_pensum_module.cargarAsignaturas()
          $("#AddPensumModal").modal('hide')
        }
      })
    },
    denominacion_toggle : function(element){

      if($(element.currentTarget).hasClass('active') == true){

        this.button_toggle = false
        this.pensum.denominacion_asignatura = ''
      }else{

        this.button_toggle = true
        let selected_materia = this.materias.find(m => m.id == this.id_materia)
        this.pensum.denominacion_asignatura = selected_materia.materia
      }
    },
    cancel : function(){
      this.materia = {};
      this.filtro = '';
      this.materia_selected = false;
      this.deploy_form = false;
    }
  }
});

Vue.component('oferta-academica-module',
{
  template:`
  <div :style="Styles.marginTop">
    <center>
      <h1 class="display-4">
        Gestion de oferta academica
      </h1>
    </center>
    <div class="card bg-light mb-3" :style="Styles.marginBottom">
      <div class="card-body">
        <div class="row">
          <div class="col-md-8 col-sm-8 col-lg-8">
            <div class="form-inline">
              <div class="form-group">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-default">Campo de filtrado</span>
                  </div>
                  <input style="margin:0;" type="text" class="form-control" placeholder="" v-model="filtro">
                </div>
              </div>
            </div>
          </div>
          <div :style="Styles.marginBottom" class="text-md-right col-md-4 col-sm-4 col-lg-4">
            <button type="button" class="btn btn-primary" @click="deploy_form = true">Nueva oferta academica</button>
          </div>
        </div>
      </div>
      <div class="table-responsive">
        <table id="tabla-estudiantes" class="table table-striped table-hover no-wrap">
          <thead>
              <tr>
                <th>Carrera</th>
                <th>Trayecto</th>
                <th>Acción</th>
              </tr>
          </thead>
            <paginate name="ofertas_academicas" :list="ofertas_academicas" :per="5" tag="tbody">
              <tr v-if="ofertas_academicas.length == 0">
                <td :style="Styles.middleAlign" colspan="6">
                  <center>
                    <h4 style="margin: 0;">
                      <label style="margin: 0;">
                        Sin registros
                      </label>
                    </h4>
                  </center>
                </td>
              </tr>
              <tr v-for="oferta_academica in paginated('ofertas_academicas')">
                <td :style="Styles.middleAlign">
                  {{ oferta_academica.carrera }}
                </td>
                <td :style="Styles.middleAlign">
                  {{ oferta_academica.trayecto }}
                </td>
                <td class="text-right">
                  <button type="button" class="btn btn-primary btn-sm" @click="displayOfertaAcademica(oferta_academica)"><strong>Desplegar</strong></button>
                  <button type="button" class="btn btn-danger btn-sm" @click="deleteOfertaAcademica(oferta_academica.id)"><strong>Eliminar</strong></button>
                </td>
              </tr>
            </paginate>
        </table>
      </div>
    </div>
    <center>
      <h1 class="display-4">
        Datos de la oferta academica
      </h1>
    </center>
    <div class="row">
      <div class="col-md-12 col-sm-12 col-lg-12">
        <div v-if="oferta_academica_selected == false && deploy_form == false" class="card bg-light mb-3">
          <div class="card-body">
            <div class="row">
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 mb-12">
                <center>
                  <h1 v-if="ofertas_academicas.length > 0">
                    <small class="text-muted">Pulse <span class="badge badge-primary">Desplegar</span> en la fila de la oferta para ver los campos</small>
                  </h1>
                </center>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="card bg-light mb-3">
          <div class="card-body">
            <div class="form-group row">
              <div class="col-md-2">
                <label class="col-form-label">Periodo academico:</label>
              </div>
              <div class="col-md-1">
                <input id="startDate" name="startDate" type="text" class="datepicker form-control" readonly disabled :value="periodo_inicio"/>
              </div>
              <label class="col-form-label">-</label>
              <div class="col-md-1">
                <input id="endDate" name="endDate" type="text" class="datepicker form-control" readonly disabled :value="periodo_fin"/>
              </div>
            </div>
            <div class="form-group row">
              <div class="col-md-2">
                <label class="col-form-label">Carrera:</label>
              </div>
              <div class="col-md-4">
                <select v-model="id_carrera" @change="getTrayectosAca" class="form-control custom-control-inline" id="id_carrera" name="carrera">
                  <option v-for="carrera in carreras" :value="carrera.id">{{ carrera.carrera }}</option>
                </select>
              </div>
            </div>
            <div class="form-group row"> <!-- Full Name -->
              <div class="col-md-2">
                <label class="col-form-label">Trayecto:</label>
              </div>
              <div class="col-md-4">
                <select v-model="oferta_academica.id_trayectoAca" @change="cargarAsignaturas" class="form-control custom-control-inline" id="id_trayecto" name="trayecto">
                  <option value="" selected>Seleccione</option>
                  <option v-for="trayecto in trayectos" :value="trayecto.id">{{ trayecto.trayecto }}</option>
                </select>
              </div>
            </div>
            <div class="card-header">
              <h5 style="margin: 0">
                Secciones:
              </h5>
            </div>
            <div class="form-group card card-body">
              <div id="container-secciones">
                <div v-for="(seccion, index) in oferta_academica.secciones" class="form-group row">
                  <div v-if="index > 0" class="col-md-12">
                    <hr>
                  </div>
                  <div class="col-md-3">
                    <label class="col-form-label">Identificador de la sección:</label>
                  </div>
                  <div class="col-md-2">
                    <input type="text" :disabled="original_secciones.some(secc => secc.id == seccion.id)" v-model="seccion.codigo" class="form-control" name="seccion" aria-label="Sección">
                  </div>
                  <div class="col-md-3">
                    <label class="col-form-label">Cupos limite para esta sección:</label>
                  </div>
                  <div class="col-md-1">
                    <input type="text" :disabled="original_secciones.some(secc => secc.id == seccion.id)" v-model="seccion.cupos" class="form-control" name="cupos" aria-label="Cupos">
                  </div>
                  <div v-if="oferta_academica_selected" class="col-md-3 text-md-right">
                    <button @click="modifySeccion" class="btn btn-success btn-sm" id="other_seccion"><strong>Modificar</strong></button>
                    <button @click="deleteSeccion" class="btn btn-danger btn-sm" id="delete_seccion"><strong>Eliminar</strong></button>
                  </div>
                </div>
              </div>
              <hr>
              <div class="row">
                <div class="col-md-12">
                  <button v-if="oferta_academica_selected" class="btn btn-success btn-sm" @click="updateSecciones">Actualizar secciones</button>
                  <button @click="deleteRow" :disabled="boolean_delete" style="float:right;" class="badge badge-pill badge-danger" id="delete_seccion"><strong>-</strong></button>
                  <button @click="addRow" style="float:right;" class="badge badge-pill badge-primary" id="other_seccion"><strong>+</strong></button>
                </div>
              </div>
            </div>
            <div class="card-header">
              <h5 style="margin: 0">
                Asignaturas a cargar:
              </h5>
            </div>
            <div class="form-group card">
              <div id="container-asignaturas">
                <table id="tabla-asignaturas" class="table table-striped table-hover no-wrap">
                  <thead>
                    <tr>
                      <th>Asignatura</th>
                      <th>horas practicas semanales</th>
                      <th>Horas totales</th>
                      <th></th>
                    </tr>
                  </thead>
                    <tr v-if="asigs_pensum.length == 0">
                      <td :style="Styles.middleAlign" colspan="6">
                        <center>
                          <h4 style="margin: 0;">
                            <label style="margin: 0;">
                              Sin registros
                            </label>
                          </h4>
                        </center>
                      </td>
                    </tr>
                    <tr v-for="(asignatura, index) in asigs_pensum">
                      <td :style="Styles.middleAlign">
                        {{ asignatura.desc_asignatura }}
                      </td>
                      <td :style="Styles.middleAlign">
                        {{ asignatura.hps }}
                      </td>
                      <td :style="Styles.middleAlign">
                        {{ asignatura.ht }}
                      </td>
                      <td class="text-right">
                        <div class="custom-control custom-switch">
                          <input type="checkbox" class="custom-control-input" @click="toggleAsignatura(asignatura.id, index)" :checked="oferta_academica.asignaturas.some(asig => asig.id === asignatura.id)" :id="'customSwitch'+index">
                          <label class="custom-control-label" :for="'customSwitch'+index"></label>
                        </div>
                      </td>
                    </tr>
                </table>
              </div>
              <button v-if="oferta_academica_selected" class="btn btn-primary btn-sm" id="crear" @click="modificarOfertaAcademica">Modificar oferta academica</button>
            </div>
            <div class="form-group">
              <center>
                <button v-if="!oferta_academica_selected" class="btn btn-primary btn-sm" id="crear" @click="registrarOfertaAcademica">Crear oferta academica</button>
              </center>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `,
  data() {
    return {
      Styles : {
        middleAlign : {
          'vertical-align': 'middle'
        },
        marginBottom : {
          'margin-bottom' : '15px'
        },
        marginTop : {
          'margin-top' : '15px'
        },
        scrollX : {
          'overflow-x' : 'auto',
          'white-space' : 'nowrap'
        }
      },
      id_carrera : '',
      carreras : [],
      trayectos : [],
      asigs_pensum : [],
      ofertas_academicas : [],
      oferta_academica : {
        asignaturas : [],
        secciones : [
          {}
        ]
      },
      original_secciones : [],
      update_asignaturas : {
        'new' : [],
        'delete' : []
      },
      paginate : ['ofertas_academicas'],
      html_content : '<center>\
                        <div class="col-md-8"><hr></div>\
                          <h6>Seleccione carrera para cargar la malla curricular</h6>\
                        <div class="col-md-8"><hr></div>\
                      </center>',
      periodo_inicio : moment().year(),
      periodo_fin : moment().add(1, 'y').year(),
      oferta_academica_selected : false,
      deploy_form : false,
      boolean_delete : true
    }
  },
  created(){
    data.component_pensum_module = this
    this.getOfertasAcademicas()
    this.getCarreras()
  },
  methods:{
    deleteRow : function(){

      let secciones = this.original_secciones;
      if(this.oferta_academica_selected){

        if(this.oferta_academica.secciones.length > this.original_secciones.length){

          this.oferta_academica.secciones.splice((this.oferta_academica.secciones.length-1), 1)
          if(this.oferta_academica.secciones.length == this.original_secciones.length)
            this.boolean_delete = true
        }
      }else{

        this.oferta_academica.secciones.splice((this.oferta_academica.secciones.length-1), 1)
        if(this.oferta_academica.secciones.length == 1)
          this.boolean_delete = true
      }
    },
    addRow : function(){

      this.oferta_academica.secciones.push({})
      if((this.oferta_academica.secciones.length - this.original_secciones.length) >= 1)
        this.boolean_delete = false
    },
    getOfertasAcademicas : function(){

      axios.post(getApiURL()+'/oferta_academica/list')
      .then(response => {
          this.ofertas_academicas = response.data.data;
          // console.log(response.data.data)
      })
      .catch(error => {

      });
    },
    displayOfertaAcademica : function(oferta_academica){

      axios.post(getApiURL()+'/oferta_academica/get', {
        oferta_academica : oferta_academica
      })
      .then(response => {
        this.oferta_academica = response.data.data;
        this.getCarreras()
        this.id_carrera = this.oferta_academica.id_carrera
        this.getTrayectosAca()
        this.cargarAsignaturas()
        Object.assign(this.original_secciones, response.data.data.secciones)
        this.oferta_academica_selected = true;
      })
      .catch(error => {

      });
    },
    getCarreras : function(){

      axios.post(getApiURL()+'/carrera/registradas')
      .then(response => {
          this.carreras = response.data.data;
      })
      .catch(error => {

      });
    },
    getTrayectosAca : function(){

      axios.post(getApiURL()+'/trayecto/dinamic_list',{
        id_carrera : this.id_carrera
      })
      .then(response => {
          this.trayectos = response.data.data;
      })
      .catch(error => {

      });
    },
    cargarAsignaturas : function(){

      axios.post(getApiURL()+'/pensum/get_asigs_byTrayecto',{
        id_trayecto : this.oferta_academica.id_trayectoAca
      })
      .then(response => {
          this.asigs_pensum = response.data.data;;
      })
      .catch(error => {

      });
    },
    toggleAsignatura : function(id_asignatura, index){

      if(!this.oferta_academica_selected){

        if($("#customSwitch"+index).prop('checked')){

          this.oferta_academica.asignaturas.push(id_asignatura)
        }else{

          _.remove(this.oferta_academica.asignaturas, function(e){

            return e === id_asignatura
          })
        }
      }else{

        if($("#customSwitch"+index).prop('checked')){

          _.remove(this.update_asignaturas.delete, function(e){
            return e === id_asignatura
          })

          if(!this.oferta_academica.asignaturas.some(asig => asig.id === id_asignatura))
            this.update_asignaturas.new.push(id_asignatura)
        }else{

          if(this.oferta_academica.asignaturas.some(asig => asig.id === id_asignatura))
          console.log("debo caer aqui")
            this.update_asignaturas.delete.push(id_asignatura)
        }
      }
    },
    modifySeccion : function(element){

      if(!$(element.currentTarget).hasClass('active')){

        $(element.currentTarget).addClass('active')
        $(element.currentTarget).parent().parent().find('input').prop('disabled', false)
      }else{

        let seccion = this.oferta_academica.secciones[$(element.currentTarget).parent().parent().index()]

        Swal.fire({
          width: 550,
          icon: 'info',
          html: '¿Esta seguro de modificar esta sección?',
          showCancelButton: true,
          confirmButtonText: 'Confirmar',
          showLoaderOnConfirm: true,
          preConfirm: () => {

            return axios.put(getApiURL() +'/oferta_academica/modify_seccion', {
              seccion : seccion
            })
            .then(response => {

              if(response.status != '200') {
                throw new Error(response.statusText)
              }
              return response.data.data;
            })
           .catch(error => {

             if(error.response.data.error.status_code == '422'){

                Swal.showValidationMessage(
                  error.response.data.error.message
                )
             }else{

                Swal.showValidationMessage(
                  `Request fail: ${error}`
                )
             }
           });
          },
          allowOutsideClick: () => !Swal.isLoading()
        }).then(result => {
          if(result.value){
            Swal.fire({
              width: 650,
              icon: 'success',
              title: 'Actualización realizada.'
            })
          }
        })
        $(element.currentTarget).parent().parent().find('input').prop('disabled', true)
        $(element.currentTarget).removeClass('active')
      }
    },
    deleteSeccion : function(element){

      let seccion = this.oferta_academica.secciones[$(element.currentTarget).parent().parent().index()]

      Swal.fire({
        width: 550,
        icon: 'warning',
        html: '¿Esta seguro de eliminar esta sección?',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        showLoaderOnConfirm: true,
        preConfirm: () => {

          return axios.put(getApiURL() +'/oferta_academica/delete_seccion', {
            seccion : seccion
          })
          .then(response => {

            if(response.status != '200') {
              throw new Error(response.statusText)
            }
            this.oferta_academica.secciones.splice($(element.currentTarget).parent().parent().index(), 1)
            return response.data.data;
          })
         .catch(error => {

           if(error.response.data.error.status_code == '422'){

              Swal.showValidationMessage(
                error.response.data.error.message
              )
           }else{

              Swal.showValidationMessage(
                `Request fail: ${error}`
              )
           }
         });
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then(result => {
        if(result.value){
          Swal.fire({
            width: 650,
            icon: 'success',
            title: 'Eliminada.'
          })
        }
      })
    },
    updateSecciones : function(){

      Swal.fire({
        width: 550,
        title: 'Confirmación',
        icon: 'info',
        html: '¿Esta seguro de añadir una nueva sección?',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        showLoaderOnConfirm: true,
        preConfirm: () => {

          let original_secciones = this.original_secciones
          let secciones = this.oferta_academica.secciones.filter(function(seccion){
            return !original_secciones.some(secc => secc.id === seccion.id);
          })

          return axios.put(getApiURL() +'/oferta_academica/update_secciones', {
            oferta_academica : {'secciones' : secciones,
                                'asignaturas' : this.oferta_academica.asignaturas
                              }
          })
          .then(response => {

            if(response.status != '200') {
              throw new Error(response.statusText)
            }
            return response.data.data;
          })
         .catch(error => {

           if(error.response.data.error.status_code == '422'){

             if(error.response.data.error.code == '0'){
               Swal.showValidationMessage(
                 `Llene los campos.`
               )
             }else if(error.response.data.error.code == '2'){
                Swal.showValidationMessage(
                  error.response.data.error.message
                )
             }else if(error.response.data.error.code == '3'){
                Swal.showValidationMessage(
                  error.response.data.error.message
                )
             }
           }else{
             Swal.showValidationMessage(
               `Request fail: ${error}`
             )
           }
         });
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then(result => {
        if(result.value){
          Swal.fire({
            width: 650,
            icon: 'success',
            title: 'Actualización realizada.'
          })
        }
      })
    },
    registrarOfertaAcademica : function(){

      Swal.fire({
        width: 550,
        title: 'Confirmación',
        icon: 'info',
        html: '¿Esta seguro de crear esta oferta academica?',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return axios.put(getApiURL() +'/oferta_academica/add', {
            oferta_academica : this.oferta_academica
          })
          .then(response => {

            if(response.status != '200') {
              throw new Error(response.statusText)
            }
            return response.data.data;
          })
         .catch(error => {

           if(error.response.data.error.status_code == '422'){

             if(error.response.data.error.code == '0'){
               Swal.showValidationMessage(
                 `Llene los campos.`
               )
             }else if(error.response.data.error.code == '2'){
                Swal.showValidationMessage(
                  error.response.data.error.message
                )
             }else if(error.response.data.error.code == '3'){
                Swal.showValidationMessage(
                  error.response.data.error.message
                )
             }
           }else{
             Swal.showValidationMessage(
               `Request fail: ${error}`
             )
           }
         });
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then(result => {
        if(result.value){
          Swal.fire({
            width: 650,
            icon: 'success',
            title: 'Registro realizado.'
          })
            this.getOfertasAcademicas()
          this.oferta_academica = {
            asignaturas : [],
            secciones : [
              {}
            ]
          }
          this.deploy_form = false;
        }
      })
    },
    modificarOfertaAcademica : function(){

      Swal.fire({
        width: 550,
        title: 'Confirmación',
        icon: 'info',
        html: '¿Esta seguro de modificar esta oferta academica?',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return axios.put(getApiURL() +'/oferta_academica/modify', {
            update_asignaturas : this.update_asignaturas,
            id_trayectoAca : this.oferta_academica.id_trayectoAca
          })
          .then(response => {

            if(response.status != '200') {
              throw new Error(response.statusText)
            }
            return response.data.data;
          })
         .catch(error => {

           if(error.response.data.error.status_code == '422'){

             if(error.response.data.error.code == '0'){
               Swal.showValidationMessage(
                 `Llene los campos.`
               )
             }else if(error.response.data.error.code == '2'){
                Swal.showValidationMessage(
                  error.response.data.error.message
                )
             }else if(error.response.data.error.code == '3'){
                Swal.showValidationMessage(
                  error.response.data.error.message
                )
             }
           }else{
             Swal.showValidationMessage(
               `Request fail: ${error}`
             )
           }
         });
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then(result => {
        if(result.value){
          Swal.fire({
            width: 650,
            icon: 'success',
            title: 'Actualizada.'
          })
        }
      })
    },
    cancel : function(){
      this.oferta_academica = {
        asignaturas : [],
        secciones : [
          {}
        ]
      };
      this.oferta_academica_selected = false;
      this.deploy_form = false;
    }
  }
});

Vue.component('horarios-module',
{
  template:`
  <div :style="Styles.marginTop">
    <center>
      <h1 class="display-4">
        Gestion de horarios
      </h1>
    </center>
    <div class="card bg-light mb-3" :style="Styles.marginBottom">
      <div class="card-body">
        <div class="row">
          <div class="col-md-4 col-sm-4 col-lg-4">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <label class="input-group-text" for="inputGroupSelect01">Carrera</label>
              </div>
              <select v-model="id_carrera" @change="getTrayectosAca" class="form-control custom-control-inline" id="id_carrera" name="carrera">
                <option v-for="carrera in carreras" :value="carrera.id">{{ carrera.carrera }}</option>
              </select>
            </div>
          </div>
          <div class="col-md-4 col-sm-4 col-lg-4">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <label class="input-group-text" for="inputGroupSelect01">Trayecto academico</label>
              </div>
              <select v-model="id_trayectoAca" @change="cargarSecciones" class="form-control custom-control-inline" id="id_trayecto" name="trayecto">
                <option value="" selected>Seleccione</option>
                <option v-for="trayecto in trayectos" :value="trayecto.id">{{ trayecto.trayecto }}</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="table-responsive">
        <table id="tabla-estudiantes" class="table table-striped table-hover no-wrap">
          <thead>
            <tr>
              <th>Sección</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>
          <paginate name="secciones" :list="secciones" :per="5" tag="tbody">
            <tr v-if="secciones.length == 0">
              <td :style="Styles.middleAlign" colspan="6">
                <center>
                  <h4 style="margin: 0;">
                    <label style="margin: 0;">
                      Sin registros
                    </label>
                  </h4>
                </center>
              </td>
            </tr>
            <tr v-for="seccion in paginated('secciones')">
              <td :style="Styles.middleAlign">
                {{ seccion.codigo }}
              </td>
              <td :style="Styles.middleAlign">
                <h5>
                  <span v-if="seccion.rezagadas > 0" class="badge badge-secondary">Incompleta <span class="badge badge-light">{{ seccion.rezagadas }}</span></span>
                  <span v-else class="badge badge-success">Completa</span>
                </h5>
              </td>
              <td class="text-right">
                <button v-if="seccion.agendadas == 0" type="button" class="btn btn-primary btn-sm" @click="displayPanel(seccion)"><strong>Generar horario</strong></button>
                <button v-else type="button" class="btn btn-primary btn-sm" @click="displayPanel(seccion)"><strong>Desplegar horario</strong></button>
                <button type="button" class="btn btn-danger btn-sm" @click="deleteHorario(seccion.id)"><strong>Eliminar</strong></button>
              </td>
            </tr>
          </paginate>
        </table>
      </div>
    </div>
    <center>
      <h1 class="display-4">
        Creación de horario
      </h1>
    </center>
    <div class="row">
      <div class="col-md-12 col-sm-12 col-lg-12">
        <div v-if="seccion_selected == false && deploy_form == false" class="card bg-light mb-3">
          <div class="card-body">
            <div class="row">
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 mb-12">
                <center>
                  <h1 v-if="secciones.length > 0">
                    <small class="text-muted">Pulse <span class="badge badge-primary">Desplegar</span> en la fila de la seccion para ver el horario correspondiente.</small>
                  </h1>
                </center>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="card bg-light mb-3">
          <div class="card-body">
            <div class="row">
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 mb-12">
                <div class="row">
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <label>Nombre:</label>
                    <input v-model="horario.nombre" class="form-control" type="text" name="nombre" >
                  </div>
                </div>
                <div class="row">
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <label>Descripción:</label>
                    <textarea v-model="horario.descripcion" class="form-control" name="descripcion" rows="3"></textarea>
                  </div>
                </div>
                <div class="row">
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <label>Inicio:</label>
                    <input v-model="horario.inicio" type="time" id="appt" class="form-control" name="appt" min="09:00" max="18:00" required>
                  </div>
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <label>Final:</label>
                    <input v-model="horario.fin" type="time" id="appt" class="form-control" name="appt" min="09:00" max="18:00" required>
                  </div>
                </div>
                <div class="row align-items-end">
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <label>Dividir Entre:</label>
                    <select v-model="horario.division" class="form-control" name="minutos">
                        <option></option>
                        <option value="35">35 Minutos</option>
                        <option value="45">45 minutos</option>
                        <option value="60">1 Hora</option>
                    </select>
                  </div>
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <button type="button" class="btn btn-primary btn-sm" @click="displayHorario"><strong>Generar horario</strong></button>
                    <button type="button" class="btn btn-danger btn-sm" @click="cancel"><strong>Cancelar</strong></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card bg-light mb-3">
          <div class="card-body" id="contentHorario" v-html="html_horario" ref="html_horario">
          </div>
          <button v-if="show_save" @click="guardarHorario" class="guardarhorario btn btn-lg btn-warning pull-right"><i class="fa fa-floppy-o"></i> Guardar</button>
          <button v-if="show_modify" @click="modificarHorario" class="modificarhorario btn btn-lg btn-warning pull-right"><i class="fa fa-floppy-o"></i> Modificar</button>
        </div>
      </div>
    </div>
  </div>
  `,
  data() {
    return {
      Styles : {
        middleAlign : {
          'vertical-align': 'middle'
        },
        marginBottom : {
          'margin-bottom' : '15px'
        },
        marginTop : {
          'margin-top' : '15px'
        },
        scrollX : {
          'overflow-x' : 'auto',
          'white-space' : 'nowrap'
        }
      },
      id_carrera : '',
      carreras : [],
      trayectos : [],
      id_trayectoAca : '',
      secciones : [],
      seccion : {},
      horario : {},
      paginate : ['secciones'],
      html_content : '<center>\
                        <div class="col-md-8"><hr></div>\
                          <h6>Seleccione carrera para cargar la malla curricular</h6>\
                        <div class="col-md-8"><hr></div>\
                      </center>',
      html_horario : '<div class="row">\
                          <div class="col-md-12">\
                            <center>\
                              <i class="fa fa-calendar fa-5x" aria-hidden="true"></i>\
                              <p class="lead" style="margin: 0;">\
                                Horario\
                              </p>\
                            </center>\
                          </div>\
                        </div>',
      default_message : '<div class="row">\
                          <div class="col-md-12">\
                            <center>\
                              <i class="fa fa-calendar fa-5x" aria-hidden="true"></i>\
                              <p class="lead" style="margin: 0;">\
                                Horario\
                              </p>\
                            </center>\
                          </div>\
                        </div>',
      classes : [],
      seccion_selected : false,
      deploy_form : false,
      show_save : false,
      show_modify : false
    }
  },
  created(){
    data.component_horario_module = this
    this.getCarreras()
  },
  mounted(){
    $("#contentHorario").on("mouseenter mouseleave", '#thetable tbody tr .td-line', function (e) {
      if (e.type == "mouseenter") {
        $(this).find('button').show();
      } else {
        $(this).find('button').hide();
      }
    }).on('click', '.addinfo', this.addClassModal)
    .on('click', '.removeclass', this.removeClass);
  },
  methods:{
    getCarreras : function(){

      axios.post(getApiURL()+'/carrera/registradas')
      .then(response => {
          this.carreras = response.data.data;
      })
      .catch(error => {

      });
    },
    getTrayectosAca : function(){

      axios.post(getApiURL()+'/trayecto/dinamic_list',{
        id_carrera : this.id_carrera
      })
      .then(response => {
          this.trayectos = response.data.data;
      })
      .catch(error => {

      });
    },
    cargarSecciones : function(e){

      axios.post(getApiURL()+'/oferta_academica/get_all_secciones',{
        id_trayectoAca : e !== null ? $(e.currentTarget).val() : this.id_trayectoAca
      })
      .then(response => {
          this.secciones = response.data.data;;
      })
      .catch(error => {

      });
    },
    displayPanel : function(seccion){

      this.seccion = seccion
      if(this.seccion.agendadas > 0){

        axios.post(getApiURL()+'/oferta_academica/get_horario', {
          seccion_id : this.seccion.id
        })
        .then(response => {
          Vue.set(this.seccion, 'horario', response.data.data.horario);
          this.horario = this.seccion.horario
          this.classes = response.data.data.clases
          this.html_horario = this.seccion.horario.horario
          this.show_modify = true;
        })
        .catch(error => {

        })
        .finally(() =>{

        });
      }
      this.seccion_selected = true
    },
    displayHorario : function(e){

      if(this.show_modify){

        Swal.fire({
          width: 550,
          title: 'Confirmación',
          icon: 'info',
          html: '¿Esta seguro de generar un nuevo horario en blanco?',
          showCancelButton: true,
          confirmButtonText: 'Confirmar',
          showLoaderOnConfirm: true,
          preConfirm: () => {
            return this.getHorario();
          },
          allowOutsideClick: () => !Swal.isLoading()
        }).then(result => {

          this.show_save = false;
          this.show_modify = true;
          if(result.value){

            Swal.fire({
              position: 'top',
              toast: true,
              timer: 4000,
              showConfirmButton: false,
              timerProgressBar: true,
              icon: 'success',
              title: 'Generado.'
            })
          }
        })
      }else{
        this.getHorario();
      }
    },
    getHorario : function(){

      return axios.post(getApiURL()+'/oferta_academica/generate_horario', {
        horario : this.horario
      })
      .then(response => {
        this.html_horario = response.data.data.content
        this.show_save = true;
        this.show_modify = false;
      })
      .catch(error => {

      });
    },
    addClassModal : function(e){

      var dum = $(e.currentTarget).attr('data-row');
      data.component_set_task.td_Id = dum;
      data.component_set_task.seccion = data.component_horario_module.seccion;
      data.component_set_task.blocks = $('#thetable tbody').find('tr').length;
      data.component_set_task.current_row = $(e.currentTarget).parent().parent().parent().index();
      data.component_set_task.current_col = $(e.currentTarget).parent().parent().index();
      data.component_set_task.getClases();
      $('#setTask').modal('show');
    },
    removeClass : function(e){

      let td_parent = $(e.currentTarget).parent();
      let tr_parent = $(e.currentTarget).parent().parent();
      let row_span = td_parent.attr('rowspan');

      _.remove(this.classes, function(e){
        return e.codigo === td_parent.attr('data-codeclass');
      })

      let td_index = td_parent.index();
      let td_coordinate = td_parent.attr('data-Rcoordinate');
      let has_rowspan = 0;
      td_parent.remove();
      $('#thetable tbody tr').slice(tr_parent.index(), (parseInt(tr_parent.index())+parseInt(row_span)))
                              .each(function(){

                                  $(this).find('td').eq((td_index-1)).after('<td class="td-line td-'+td_coordinate+'" data-Rcoordinate="'+td_coordinate+'">\
                                                    <div class="col-sm-12 nopadding"></div>\
                                                    <div class="col-sm-12 text-center">\
                                                      <button style="margin: 0px;" class="addinfo btn btn-xs btn-primary"><i class="fa fa-plus"></i></button>\
                                                    </div>\
                                                  </td>');
                              });

    },
    guardarHorario : function(){

      Vue.set(this.horario, 'horario', this.$refs.html_horario.innerHTML);
      Vue.set(this.horario, 'clases', this.classes);

      Swal.fire({
        width: 550,
        title: 'Confirmación',
        icon: 'info',
        html: '¿Esta seguro de guardar el horario creado?',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return axios.put(getApiURL() +'/oferta_academica/save_horario', {
            horario : this.horario
          })
          .then(response => {

            if(response.status != '200') {
              throw new Error(response.statusText)
            }
            return response.data.data;
          })
         .catch(error => {

           if(error.response.data.error.status_code == '422'){

             if(error.response.data.error.code == '0'){
               Swal.showValidationMessage(
                 `Llene los campos.`
               )
             }else if(error.response.data.error.code == '2'){
                Swal.showValidationMessage(
                  error.response.data.error.message
                )
             }else if(error.response.data.error.code == '3'){
                Swal.showValidationMessage(
                  error.response.data.error.message
                )
             }
           }else{
             Swal.showValidationMessage(
               `Request fail: ${error}`
             )
           }
         });
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then(result => {
        if(result.value){
          Swal.fire({
            width: 650,
            icon: 'success',
            title: 'Registro realizado.'
          })
          this.html_horario = this.default_message
          this.cargarSecciones(null)
          this.seccion = {}
          this.seccion_selected = false;
          this.show_save = false;
          this.show_modify = false;
          this.deploy_form = false;
        }
      })
    },
    modificarHorario : function(){

      Vue.set(this.horario, 'horario', this.$refs.html_horario.innerHTML);

      Swal.fire({
        width: 550,
        title: 'Confirmación',
        icon: 'info',
        html: '¿Esta seguro de modificar este horario?',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return axios.put(getApiURL() +'/oferta_academica/modify_horario', {
            horario : this.horario,
            clases : this.classes
          })
          .then(response => {

            if(response.status != '200') {
              throw new Error(response.statusText)
            }
            return response.data.data;
          })
         .catch(error => {

           if(error.response.data.error.status_code == '422'){

             if(error.response.data.error.code == '0'){
               Swal.showValidationMessage(
                 `Llene los campos.`
               )
             }else if(error.response.data.error.code == '2'){
                Swal.showValidationMessage(
                  error.response.data.error.message
                )
             }else if(error.response.data.error.code == '3'){
                Swal.showValidationMessage(
                  error.response.data.error.message
                )
             }
           }else{
             Swal.showValidationMessage(
               `Request fail: ${error}`
             )
           }
         });
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then(result => {
        if(result.value){
          Swal.fire({
            width: 650,
            icon: 'success',
            title: 'Actualizada.'
          })
          this.html_horario = this.default_message
          this.cargarSecciones(null)
          this.seccion = {}
          this.seccion_selected = false;
          this.show_save = false;
          this.show_modify = false;
          this.deploy_form = false;
        }
      })
    },
    cancel : function(){
      this.html_horario = this.default_message
      this.seccion = {}
      this.seccion_selected = false;
      this.show_save = false;
      this.show_modify = false;
      this.deploy_form = false;
    }
  }
});

Vue.component('set-task',
{
  template:`
    <div class="modal fade" id="setTask" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalCenterTitle">Agregar clase</h5>
            <button type="button" id="close_modal_withdrawal" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row" :style="Styles.marginBottom">
              <div class="col-12">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <label class="input-group-text" for="inputGroupSelect01">Seleccione</label>
                  </div>
                  <select v-model="id_clase" class="form-control custom-control-inline" id="id_clase" name="clase">
                    <option v-for="clase in carga_academica" :value="clase.id_oferta_academica">{{ clase.desc_asignatura }}</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-sm">Numero de bloques</span>
                  </div>
                  <input v-model="blocks_span" type="number" min="1" step="1" :max="(blocks - current_row)" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-sm">Cede</span>
                  </div>
                  <select @change="getAulas" class="form-control custom-control-inline" id="id_cede" name="cede">
                    <option value="" selected>Seleccione</option>
                    <option v-for="cede in cedes" :value="cede.id">{{ cede.cede }}</option>
                  </select>
                </div>
              </div>
              <div class="col-6">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-sm">aula</span>
                  </div>
                  <select @change="checkAvailability" class="form-control custom-control-inline" id="id_aula" name="aula">
                    <option value="" selected>Seleccione</option>
                    <option v-for="aula in aulas" :value="aula.id">{{ aula.name }}</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-sm">Color</span>
                  </div>
                  <select class="form-control" id="idcolortask">
                     <option value="purple-label">Purpura</option>
                     <option value="red-label">Rojo</option>
                     <option value="blue-label">Azul</option>
                     <option value="pink-label">Rosa</option>
                     <option value="green-label">Verde</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" @click="addClass" class="savetask btn btn-success"><i class="fa fa-floppy-o"></i> Incluir clase</button>
            <button type="button" class="canceltask btn btn-danger" data-dismiss="modal"><i class="fa fa-times"></i> Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      Styles : {
        middleAlign : {
          'vertical-align': 'middle'
        },
        marginBottom : {
          'margin-bottom' : '15px'
        },
        marginTop : {
          'margin-top' : '15px'
        }
      },
      td_Id : '',
      seccion : {},
      id_clase : '',
      blocks : 0,
      current_row : 0,
      current_col : 0,
      blocks_span : 1,
      carga_academica : [],
      cedes : [],
      aulas : []
    }
  },
  created(){
    data.component_set_task = this
    this.getCedes();

    $(document).on('hidden.bs.modal','#setTask', function () {
      $(this).find('select').val('')
      data.component_set_task.blocks_span = 1
    });
  },
  methods:{
    getCedes : function(){

      axios.post(getApiURL()+'/configuracion/get_instalaciones')
      .then(response => {
          this.cedes = response.data.data;
      })
      .catch(error => {

      });
    },
    getAulas : function(e){

      let cede = this.cedes.find((cede) => cede.id == $(e.currentTarget).val());
      this.aulas = cede.aulas;
    },
    checkAvailability : function(){

      let until_block = parseInt(this.current_row) + parseInt(this.blocks_span);
      let inicio = $('#thetable tbody tr').slice(this.current_row, until_block).first().find('td').eq('0').text().trim().split('-')[0]
      let final = $('#thetable tbody tr').slice(this.current_row, until_block).last().find('td').eq('0').text().trim().split('-')[1]

      axios.post(getApiURL()+'/oferta_academica/check_availability', {
        id_clase : this.id_clase,
        dia : $('#thetable thead').find('th').eq(this.current_col).text().trim(),
        aula_id : $("#id_aula").val(),
        inicio : inicio,
        final : final
      })
      .catch(error => {
        let clase = error.response.data.data;
        Swal.fire({
          width: 650,
          icon: 'error',
          title: 'Aula ocupada',
          timerProgressBar : true,
          timer : 2500,
          showConfirmButton : false,
          html : '<h3>Ya existe una clase en ese lapso de horas<br>'+clase.inicio+' - '+clase.final+'</h3>'
        })
      });
    },
    getClases : function(){

      axios.post(getApiURL()+'/oferta_academica/get_clases', {
        id_seccion : this.seccion.id
      })
      .then(response => {
        this.carga_academica = response.data.data
      })
      .catch(error => {

      });
    },
    addClass : function(){

      let until_block = parseInt(this.current_row) + parseInt(this.blocks_span);
      let current_col = this.current_col
      $('#thetable tbody tr').slice((parseInt(this.current_row)+1), until_block)
                              .each(function(){
                                $(this).find('td.td-'+current_col).remove();
                              });

      let inicio = $('#thetable tbody tr').slice(this.current_row, until_block).first().find('td').eq('0').text().trim().split('-')[0]
      let final = $('#thetable tbody tr').slice(this.current_row, until_block).last().find('td').eq('0').text().trim().split('-')[1]
      let codeClass = $('#thetable thead th').eq(this.current_col).text().trim().split('')[0]+
                      inicio.split(':')[0].trim()+
                      final.split(':')[0].trim()+
                      this.id_clase;

      $('#thetable tbody tr').eq(this.current_row)
                              .find('td').eq(this.current_col)
                              .attr('rowspan', this.blocks_span)
                              .attr('data-codeClass', codeClass)
                              .empty()
                              .html('<button style="margin: 0;" id="removeClass" class="removeclass btn btn-xs btn-secondary">remover</button>\
                                      <h6 style="margin: 0;">\
                                        '+$('#id_clase option:selected').text()+'<br>\
                                        '+inicio+' - '+final+'<br>\
                                        '+$("#id_cede option:selected").text()+'-'+$("#id_aula option:selected").text()+'\
                                      </h6>')

      data.component_horario_module.classes.push({
                                                  id_clase : this.id_clase,
                                                  codigo : codeClass,
                                                  dia : $('#thetable thead').find('th').eq(this.current_col).text().trim(),
                                                  aula_id : $("#id_aula").val(),
                                                  inicio : inicio,
                                                  final : final,
                                                  bloques : this.blocks_span
                                                })
      $('#setTask').modal('hide');
      this.seccion = {};
      this.id_clase = '';
      $("#id_cede").val('');
      $("#id_aula").val('');
      this.current_row = 0;
      this.blocks_span = 1;
    },
    cancel : function(){
      this.seccion = {};
      this.id_clase = '';
      $("#id_cede").val('');
      $("#id_aula").val('');
      this.current_row = 0;
      this.blocks_span = 1;
    }
  }
});

Vue.component('manage-materia',
{
  template:`
  <div :style="Styles.marginTop">
    <center>
      <h1 class="display-4">
        Administración de materias
      </h1>
    </center>
    <div class="card bg-light mb-3" :style="Styles.marginBottom">
      <div class="card-body">
        <div class="row">
          <div :style="Styles.marginBottom" class="col-md-8 col-sm-8 col-lg-8">
            <div class="form-inline">
              <div class="form-group">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-default">Campo de filtrado</span>
                  </div>
                  <input style="margin:0;" type="text" class="form-control" placeholder="" v-model="filtro">
                </div>
              </div>
              &nbsp;&nbsp;
              <button type="button" class="btn btn-primary" @click="get_user()">Consultar materia</button>
            </div>
          </div>
          <div :style="Styles.marginBottom" class="text-md-right col-md-4 col-sm-4 col-lg-4">
            <button type="button" class="btn btn-primary" v-on:click="deploy_form = true">Añadir materia</button>
          </div>
        </div>
      </div>
      <div class="table-responsive">
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th>
                Materia
              </th>
              <th>
              </th>
            </tr>
          </thead>
          <paginate name="asignaturas" :list="tablefilter" :per="5" tag="tbody">
            <tr v-if="asignaturas.length == 0">
              <td :style="Styles.middleAlign" colspan="5">
                <center>
                  <h4 style="margin: 0;">
                    <label style="margin: 0;">
                      Sin registros
                    </label>
                  </h4>
                </center>
              </td>
            </tr>
            <tr v-for="asignatura in paginated('asignaturas')">
              <td :style="Styles.middleAlign">
                {{ asignatura.materia }}
              </td>
              <td class="text-right">
                <button type="button" class="btn btn-primary btn-sm" @click="get_asignatura(asignatura)"><strong>Modificar</strong></button>
                <button type="button" class="btn btn-danger btn-sm" @click="delete_asignatura(asignatura.id)"><strong>Eliminar</strong></button>
              </td>
            </tr>
          </paginate>
        </table>
        <paginate-links for="asignaturas" :limit="5" :show-step-links="true" :classes="{'ul': 'pagination', 'li': 'page-item', 'a': 'page-link'}"></paginate-links>
      </div>
    </div>
    <center>
      <h1 class="display-4">
        Datos de la materia
      </h1>
    </center>
    <div class="row">
      <div class="col-md-12 col-sm-12 col-lg-12">
        <div class="card bg-light mb-3">
          <div v-if="!materia_selected && deploy_form == false" class="card-body">
            <div class="row">
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 mb-12">
                <center>
                  <h1 v-if="asignaturas.length != 0">
                    <small class="text-muted">Pulse <span class="badge badge-primary">Modificar</span> en el usuario para ver los campos</small>
                  </h1>
                  <h1 v-else>
                    <small class="text-muted">Pulse <span class="badge badge-primary">Añadir materia</span> para registrar una nueva materia</small>
                  </h1>
                </center>
              </div>
            </div>
          </div>
          <div v-else class="card-body">
            <div class="row">
              <div class="col-md-6 mb-3">
                <h6><label>Materia</label></h6>
                <input type="text" class="form-control" v-model="materia.materia" name="materia" placeholder="" required>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4">
              </div>
              <div class="col-md-4">
                <center>
                  <button v-if="deploy_form" type="submit" class="btn btn-success" @click="register_materia()">Registrar</button>
                  <button v-else type="submit" class="btn btn-success" @click="update_materia()">Actualizar</button>
                </center>
              </div>
              <div class="col-md-4">
                <button type="submit" class="btn btn-danger offset-md-9" @click="cancel">Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `,
  data() {
    return {
      Styles : {
        middleAlign : {
          'vertical-align': 'middle'
        },
        marginBottom : {
          'margin-bottom' : '15px'
        },
        marginTop : {
          'margin-top' : '15px'
        },
        scrollX : {
          'overflow-x' : 'auto',
          'white-space' : 'nowrap'
        }
      },
      filtro : '',
      materia : {
        materia : ''
      },
      deploy_form : false,
      user_type : '',
      asignaturas : [],
      paginate : ['asignaturas'],
      filtro : '',
      referer_key : '',
      materia_selected : false
    }
  },
  computed: {
    tablefilter: function(){
      return this.asignaturas.filter(asign  => {
        return this.buscarEnObjeto(asign, this.filtro);
      });
    }
  },
  created(){
    this.get_materias()
  },
  methods:{
    buscarEnObjeto(objeto, input_text){
      for (let key in objeto){
        if (objeto.hasOwnProperty(key) && objeto[key].toString().includes(input_text) ) {
          return true;
        }
      }
      return false;
    },
    get_materias : function() {
      axios.post(getApiURL()+ '/materia/get')
      .then(response => {
        this.asignaturas = response.data.data;
      })
      .catch(error => {
        alert("Ha ocurrido un error")
        //console.log(error);
      });
    },
    get_user_filter : function() {
      axios.post(getApiURL()+ '/get_user_accounts_filter',{
        filter : this.filtro
      })
      .then(response => {
        this.accounts = response.data.data;
        ////console.log(response.data.data);
      })
      .catch(error => {
        alert("Ha ocurrido un error")
        //console.log(error);
      });
    },
    get_asignatura : function(asignatura = null){
      this.cancel();
      if(asignatura.materia != ''){
        this.filtro = asignatura.materia
      }
      this.materia.id = asignatura.id;
      this.materia.materia = asignatura.materia;
      this.materia_selected = true;
    },
    register_materia : function(){

      Swal.fire({
        width: 550,
        title: 'Confirmación',
        icon: 'info',
        html: '¿Esta seguro de registrar?',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return axios.put(getApiURL() +'/materia/add', {
            materia : this.materia
          })
          .then(response => {

            if(response.status != '200') {
              throw new Error(response.statusText)
            }
            return response.data.data;
          })
         .catch(error => {

           if(error.response.data.error.status_code == '422'){
             Swal.showValidationMessage(
               `Llene el campo.`
             )
           }else{
             Swal.showValidationMessage(
               `Request fail: ${error}`
             )
           }
         });
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then(result => {
        if(result.value){
          Swal.fire({
            width: 650,
            icon: 'success',
            title: 'Registro realizado.'
          })
          this.get_materias();
          this.materia = {};
          this.deploy_form = false
        }
      })
    },
    update_materia : function(){

      Swal.fire({
        width: 600,
        title: 'Confirmación',
        icon: 'info',
        html: '¿Esta seguro de modificar esta materia?',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return axios.put(getApiURL() +'/materia/update', {
            materia : this.materia
          })
          .then(response => {

            if(response.status != '200') {
              throw new Error(response.statusText)
            }
            return response.data.data;
          })
         .catch(error => {

           if(error.response.data.error.status_code == '422'){
             Swal.showValidationMessage(
               `Verifique que el campo este rellenado.`
             )
           }else{
             Swal.showValidationMessage(
               `Request fail: ${error}`
             )
           }
         });
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then(result => {
          if(result.value){
            Swal.fire({
              width: 650,
              icon: 'success',
              title: 'Modificado correctamente.'
            })
            this.get_materias();
            this.materia = {};
            this.filtro = '';
            this.materia_selected = false;
          }
      })
    },
    delete_asignatura : function(asignatura_id){

      Swal.fire({
        width: 600,
        title: 'Confirmación',
        icon: 'warning',
        html: '¿Esta seguro de eliminar?',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return axios.post(getApiURL()+'/materia/delete', {
            asignatura_id : asignatura_id
          })
          .then(response => {
            if (response.status != '200') {
              throw new Error(response.statusText)
            }
            return response.data.data;
          })
         .catch(error => {
           Swal.showValidationMessage(
             `Request fail: ${error}`
           )
         });
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then(result => {
          if(result.value){
            Swal.fire({
              width: 650,
              icon: 'success',
              title: 'Eliminada con exito.'
            })
            this.get_materias();
            this.materia = {};
            this.materia_selected = false;
          }
      })
    },
    cancel : function(){
      this.materia = {};
      this.filtro = '';
      this.materia_selected = false;
      this.deploy_form = false;
    }
  }
});

Vue.component('profesor-module',{
  template:`
  <div :style="Styles.marginTop">
    <center v-if="!form_update">
      <h1 class="display-4">
        Gestion de profesores
      </h1>
    </center>
    <div class="card bg-light mb-3" :style="Styles.marginBottom">
      <div class="card-body">
        <div class="row">
          <div class="col-md-8 col-sm-8 col-lg-8">
            <div class="form-inline">
              <div class="form-group">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-default">Campo de filtrado</span>
                  </div>
                  <input style="margin:0;" type="text" class="form-control" placeholder="" v-model="filtro">
                </div>
              </div>
            </div>
          </div>
          <div :style="Styles.marginBottom" class="text-md-right col-md-4 col-sm-4 col-lg-4">
            <button type="button" class="btn btn-primary" v-on:click="deploy_form = true">Añadir profesor</button>
          </div>
        </div>
      </div>
      <div class="table-responsive">
        <table id="tabla-profesores" class="table table-striped table-hover no-wrap">
            <thead>
              <th>Cedula</th>
              <th>Nombres</th>
              <th>Apellidos</th>
              <th>Ingreso</th>
              <th></th>
            </thead>
            <paginate name="profesores" :list="tablefilter" :per="5" tag="tbody">
              <tr v-if="profesores.length == 0">
                <td :style="Styles.middleAlign" colspan="6">
                  <center>
                    <h4 style="margin: 0;">
                      <label style="margin: 0;">
                        Sin registros
                      </label>
                    </h4>
                  </center>
                </td>
              </tr>
              <tr v-for="profesor in paginated('profesores')">
                <td :style="Styles.middleAlign">
                  {{ profesor.cedula }}
                </td>
                <td :style="Styles.middleAlign">
                  {{ profesor.nombres }}
                </td>
                <td :style="Styles.middleAlign">
                  {{ profesor.apellidos }}
                </td>
                <td :style="Styles.middleAlign">
                  {{ new Date(profesor.fecha_registro).toLocaleDateString('ES-es') }}
                </td>
                <td class="text-right">
                  <button type="button" class="btn btn-primary btn-sm" @click="getProfesor(profesor.id_persona)"><strong>Modificar</strong></button>
                  <button type="button" class="btn btn-danger btn-sm" @click="deleteProfesor(profesor.id_profesor)"><strong>Eliminar</strong></button>
                </td>
              </tr>
            </paginate>
        </table>
      </div>
    </div>
    <center>
      <h1 class="display-4">
        Campos
      </h1>
    </center>
    <div class="card bg-light mb-3">
      <div v-if="profesor_selected == false && deploy_form == false" class="card-body">
        <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 mb-12">
            <center>
              <h1 v-if="profesores.length != 0">
                <small class="text-muted">Pulse <span class="badge badge-primary">Modificar</span> en la fila del profesor para ver los campos</small>
              </h1>
              <h1 v-else>
                <small class="text-muted">Pulse <span class="badge badge-primary">Añadir profesor</span> para registrar uno nuevo</small>
              </h1>
            </center>
          </div>
        </div>
      </div>
      <div v-else class="card-body">
        <div class="row">
          <div class="col-md-12 col-sm-12 col-lg-12">
            <div class="form-horizontal">
	            <div class="form-group">
                <label class="col-md-3 offset-md-1 col-form-label col-form-label-lg">Cédula</label>
                <div class="col-md-3 offset-md-1 input-group">
                  <input v-model="profesor.cedula" type="text" class="form-control" id="cedula" name="cedula" placeholder="cédula">&nbsp;
                  <button v-if="profesor_selected == false" type="button" class="btn btn-primary" @click="verificarExistencia">Consultar</button>
                </div>
	            </div>
	            <div class="form-group"> <!-- Full Name -->
                <label class="col-md-3 offset-md-1 col-form-label-lg">Nombres</label>
                <div class="col-md-9 offset-md-1 input-group">
                  <input v-model="profesor.nombre_uno"type="text" class="form-control custom-control-inline" id="nombre_uno" name="nombre_uno" placeholder="Primer nombre" style="width: 40%;" >
                  <input v-model="profesor.nombre_dos" type="text" class="form-control custom-control-inline" id="nombre_dos" name="nombre_dos" placeholder="Segundo nombre" style="width: 40%;">
                </div>
	            </div>
	            <div class="form-group"> <!-- Street 1 -->
                <label class="col-md-3 offset-md-1 col-form-label-lg">Apellidos</label>
                <div class="col-md-9 offset-md-1 input-group">
                  <input v-model="profesor.apellido_uno"type="text" class="form-control custom-control-inline" id="apellido_uno" name="apellido_uno" placeholder="Primer apellido" style="width: 40%;" >
                  <input v-model="profesor.apellido_dos" type="text" class="form-control custom-control-inline" id="apellido_dos" name="apellido_dos" placeholder="Segundo apellido" style="width: 40%;">
                </div>
	            </div>
              <div class="form-group">
                <label class="col-md-2 offset-md-1 col-form-label-lg">Nacionalidad:</label>
                <div class="col-md-3 offset-md-1 input-group">
                  <div class="form-check form-check-inline">
                    <input v-model="profesor.nacionalidad" type="radio" class="form-check-input" id="Vene" value="V" name="nacionalidad">
                    <label class="form-check-label" for="Vene">Venezolano</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input v-model="profesor.nacionalidad" type="radio" class="form-check-input" id="Extr" value="E" name="nacionalidad">
                    <label class="form-check-label" for="Extr">Extranjero</label>
                  </div>
                </div>
	            </div>
	            <div class="form-group"> <!-- Street 2 -->
                <label class="col-md-1 offset-md-1 col-form-label-lg">Sexo</label>
                <div class="col-md-3 offset-md-1 input-group">
                  <div class="form-check form-check-inline">
                    <input v-model="profesor.sexo" type="radio" class="form-check-input" id="Feme" value="F" name="sexo">
                    <label class="form-check-label" for="Feme">Femenino</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input v-model="profesor.sexo" type="radio" class="form-check-input" id="Masc" value="M" name="sexo">
                    <label class="form-check-label" for="Masc">Masculino</label>
                  </div>
                </div>
	            </div>
              <div class="form-group"> <!-- Street 2 -->
                <label class="col-md-4 offset-md-1 col-form-label-lg">Correo Electrónico</label>
                <div class="col-md-3 offset-md-1 input-group">
                  <input v-model="profesor.email" type="text" class="form-control" id="email" name="email" placeholder="Ingrese su Correo Electrónico">
                </div>
	            </div>
	            <div class="form-group"> <!-- Street 2 -->
                <label for="street2_id" class="col-md-4 offset-md-1 col-form-label-lg">Fecha de Nacimiento</label>
                <div class="col-md-3 offset-md-1 input-group">
                    <input v-model="profesor.fecha_nac" type="date" class="form-control" id="fecha_nac" name="fecha_nac" placeholder="">
                </div>
	            </div>
	            <div class="form-group"> <!-- Street 2 -->
                <label for="id_pais" class="col-md-4 offset-md-1 col-form-label-lg">Lugar de Nacimiento</label>
                <div class="col-md-8 offset-md-1 input-group">
                  <select class="form-control custom-control-inline select-local" id="id_pais_nac" name="pais" v-model="id_pais" @change="getProvincias()" style="width: 25%;">
                  	<option v-for="pais in paises" :value="pais.id">{{ pais.pais }}</option>
                  </select>
                  <select class="form-control custom-control-inline select-local" id="id_provincia_nac" name="provincia" v-model="profesor.id_provincia_nac" style="width: 30%;">
                    <option v-for="provincia in provincias" :value="provincia.id">{{ provincia.provincia }}</option>
                  </select>
                </div>
	            </div>
	            <div class="form-group"> <!-- Street 2 -->
                <label class="col-md-3 offset-md-1 col-form-label-lg">Localización</label>
                <div class="col-md-8 offset-md-1 input-group">
                  <select class="form-control custom-control-inline select-local" id="estado" name="estado" v-model="id_estado" @change="getMunicipios" style="width: 30%;">
                  	<option v-for="estado in estados" :value="estado.id">{{ estado.estado }}</option>
                  </select>
                    <select class="form-control custom-control-inline select-local" id="local_municipio" v-model="id_municipio" @change="getParroquias" name="municipio" style="width: 30%;">
                    <option v-for="municipio in municipios" :value="municipio.id">{{ municipio.municipio }}</option>
                  </select>
                  <select class="form-control custom-control-inline select-local" id="local_parroquia" name="parroquia" v-model="profesor.id_parroquia" style="width: 30%;">
                    <option v-for="parroquia in parroquias" :value="parroquia.id">{{ parroquia.parroquia }}</option>
                  </select>
                </div>
	            </div>
	             <div class="form-group"> <!-- Street 2 -->
                <label for="direccion" class="col-md-3 offset-md-1 col-form-label-lg">Direccion</label>
                <div class="col-md-5 offset-md-1 input-group">
                  <input v-model="profesor.direccion" type="text" class="form-control" id="local_direccion" name="local_direccion" placeholder="">
                </div>
	            </div>
              <div class="card-header">
                <h5 style="margin: 0">
                  Asignaturas a impartir:
                </h5>
              </div>
              <div class="form-group card card-body">
                <div v-if="!profesor_selected" id="container-asignaturas">
                  <div v-for="(p, indx) in pensum" class="form-group row">
                    <div v-if="indx > 0" class="col-md-12">
                      <hr>
                    </div>
                    <div class="col-md-4">
                      <label class="col-form-label-lg">Carrera</label>
                      <select @change="getTrayectosAca" class="form-control" id="id_carrera" name="carrera">
                        <option v-for="carrera in carreras" :value="carrera.id">{{ carrera.carrera }}</option>
                      </select>
                    </div>
                    <div class="col-md-3">
                      <label class="col-form-label-lg">Trayectos academicos</label>
                      <div v-for="(trayecto, index) in p.trayectos_aca" class="custom-control custom-radio">
                        <input type="radio" @click="getAsignaturasByTrayecto" :value="trayecto.id" :id="'customRadio'+indx+'-'+index" :name="'trayectoRadio'+indx" class="custom-control-input">
                        <label class="custom-control-label" :for="'customRadio'+indx+'-'+index">{{ trayecto.trayecto }}</label>
                      </div>
                    </div>
                    <div class="col-md-3">
                      <label class="col-form-label-lg">Asignatura</label>
                      <div v-for="(asignatura, index) in p.asignaturas" class="custom-control custom-checkbox">
                        <input type="checkbox" @click="addAsignaturaImpartir(asignatura.id, indx, index)" :id="'customCheck'+indx+'-'+index" :class="'checkbox-asig-impartir'+indx+' custom-control-input'">
                        <label class="custom-control-label" :for="'customCheck'+indx+'-'+index">{{ asignatura.desc_asignatura }}</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-else id="container-asignaturas">
                  <div v-for="(p, indx) in pensum" class="form-group row">
                    <div v-if="indx > 0" class="col-md-12">
                      <hr>
                    </div>
                    <div class="col-md-4">
                      <label class="col-form-label-lg">Carrera</label>
                      <select v-model="p.id_carrera" @change="getTrayectosAca" class="form-control" id="id_carrera" name="carrera">
                        <option v-for="carrera in carreras" :value="carrera.id">{{ carrera.carrera }}</option>
                      </select>
                    </div>
                    <div class="col-md-3">
                      <label class="col-form-label-lg">Trayectos academicos</label>
                      <div v-for="(trayecto, index) in p.trayectos_aca" class="custom-control custom-radio">
                        <input type="radio" :checked="trayecto.selected? true:false" @click="getAsignaturasByTrayecto" :value="trayecto.id" :id="'customRadio'+indx+'-'+index" :name="'trayectoRadio'+indx" class="custom-control-input">
                        <label class="custom-control-label" :for="'customRadio'+indx+'-'+index">{{ trayecto.trayecto }}</label>
                      </div>
                    </div>
                    <div class="col-md-3">
                      <label class="col-form-label-lg">Asignatura</label>
                      <div v-for="(asignatura, index) in p.asignaturas" class="custom-control custom-checkbox">
                        <input type="checkbox" :checked="asignatura.selected? true:false" :value="asignatura.id" :id="'customCheck'+indx+'-'+index" :class="'checkbox-asig-impartir'+indx+' custom-control-input custom-control-checkbox'">
                        <label class="custom-control-label" :for="'customCheck'+indx+'-'+index">{{ asignatura.desc_asignatura }}</label>
                      </div>
                    </div>
                  </div>
                </div>
                <hr>
                <div class="row">
                  <div class="col-md-12">
                    <button v-if="profesor_selected" @click="updateAsignaturasImpartidas" class="btn btn-success btn-sm">Actualizar asignaturas impartidas</button>
                    <button @click="deleteRow" :disabled="boolean_delete" style="float:right;" class="badge badge-pill badge-danger" id="delete_asig_impartida"><strong>-</strong></button>
                    <button @click="addRow" style="float:right;" class="badge badge-pill badge-primary" id="other_asig_impartida"><strong>+</strong></button>
                  </div>
                </div>
              </div>
	            <div v-if="!form_update" class="col-md-12 mt-3">
                <div class="alert alert-warning" role="alert">
                    <label>Por favor verifique los datos ingresados antes de registrar.</label>
                </div>
	            </div>
	            <div v-if="!form_update" class="col-md-12">
                <div class="row justify-content-center">
                  <div class="col-md-2">
                    <button v-if="deploy_form" type="submit" class="btn btn-success" id="registrar" @click="registrar_profesor">Registrar</button>
                    <button v-else type="submit" class="btn btn-primary" @click="update_profesor">Actualizar</button>
                  </div>
                  <div class="col-md-2 text-md-right">
                    <button class="btn btn-danger" @click="cancel">Cancelar</button>
                  </div>
                </div>
	            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `,
  props : ['form_update'],
  data() {
    return {
      Styles : {
        middleAlign : {
          'vertical-align': 'middle'
        },
        marginBottom : {
          'margin-bottom' : '15px'
        },
        marginTop : {
          'margin-top' : '15px'
        },
        scrollX : {
          'overflow-x' : 'auto',
          'white-space' : 'nowrap'
        }
      },
      filtro : '',
      profesores : [],
      carreras : [],
      pensum : [
       {
         trayectos_aca : [],
         asignaturas : []
       }
      ],
      asignaturas_impartir : [],
      paginate : ['profesores'],
      paises : [],
      provincias : [],
      estados : [],
      municipios : [],
      parroquias : [],
      id_pais : '',
      id_estado : '',
      id_municipio : '',
      profesor : {
        nombre_uno : '',
        nombre_dos : '',
        apellido_uno : '',
        apellido_dos : ''
      },
      deploy_form : false,
      profesor_selected : false
    }
  },
  computed: {
    tablefilter: function(){
      return this.profesores.filter(profesor  => {
        return this.buscarEnObjeto(profesor, this.filtro);
      });
    }
  },
  created(){

    data.component_profesor = this
    this.getProfesores()
    this.getCarreras()
    this.getPaises()
    this.getProvincias(95)
  },
  methods:{
    buscarEnObjeto(objeto, input_text){
      for (let key in objeto){
        if (objeto.hasOwnProperty(key) && objeto[key].toString().includes(input_text) ) {
          return true;
        }
      }
      return false;
    },
    getTrayectosAca : function(e){

      let elemento = $(e.currentTarget);
      _.remove(this.asignaturas_impartir, function(e, index){

        return index === elemento.parent().parent().index()
      })

      axios.post(getApiURL()+'/trayecto/dinamic_list',{
        id_carrera : elemento.val()
      })
      .then(response => {

        this.pensum[elemento.parent().parent().index()].trayectos_aca = response.data.data
        $("input[name=trayectoRadio"+elemento.parent().parent().index()+"]").prop("checked", false)
        this.pensum[elemento.parent().parent().index()].asignaturas = []
      })
      .catch(error => {

      });
    },
    getAsignaturasByTrayecto : function(e){

      let elemento = $(e.currentTarget);
      _.remove(this.asignaturas_impartir, function(e, index){

        return index === elemento.parent().parent().parent().index()
      })

      axios.post(getApiURL()+'/pensum/get_asigs_byTrayecto',{
        id_trayecto : elemento.val()
      })
      .then(response => {
        let pensum = this.pensum[elemento.parent().parent().parent().index()]
        this.pensum[elemento.parent().parent().parent().index()].asignaturas = response.data.data
        $(".checkbox-asig-impartir"+elemento.parent().parent().parent().index()).prop("checked", false)
      })
      .catch(error => {

      });
    },
    verificarExistencia : function(){

      axios.post(getApiURL()+'/profesor/verificar_existencia',{
        cedula : this.profesor.cedula
      })
      .then(response => {

        if(response.data.data[0] != null){

          let nombres = response.data.data[0].nombres.split(', ');

          this.profesor.nombre_uno = nombres[1].split(' ')[0];
          this.profesor.nombre_dos = nombres[1].split(' ')[1];
          this.profesor.apellido_uno = nombres[0].split(' ')[0];
          this.profesor.apellido_dos = nombres[0].split(' ')[1]+' '+nombres[0].split(' ')[2];
          this.deploy_from = true
        }else{

          Swal.fire({
            position: 'top',
            toast: true,
            timer: 2000,
            showConfirmButton: false,
            timerProgressBar: true,
            icon: 'error',
            text: 'No existe profesor con esta cedula.'
          })
        }
      })
      .catch(error => {

      });
    },
    getProfesor : function(id_persona){

      return axios.post(getApiURL()+'/profesor/get_profesor',{
        id_persona : id_persona
      })
      .then(response => {

        this.profesor = response.data.data;
        this.pensum = response.data.data.impartidas
        this.id_pais = this.profesor.id_pais
        this.getProvincias()

        this.getProvincias(95).then(() => {

          this.id_estado = this.profesor.id_estado
          this.getMunicipios();
        }).then(() => {

          this.id_municipio = this.profesor.id_municipio
          this.getParroquias();
        })

        this.profesor_selected = true
      })
      .catch(error => {

      });
    },
    getProfesores : function(){

      axios.post(getApiURL()+'/profesor/get_registrados')
      .then(response => {
          this.profesores = response.data.data;
      })
      .catch(error => {

      });
    },
    getPaises : function (){

      return axios.post(getApiURL()+'/location/list')
      .then(response => {
          this.paises = response.data.data;
      })
      .catch(error => {

      });
    },
    getProvincias : function(id_vzla = null){

      let url = ''
      !id_vzla? url = '/location/province/list' : url = '/location/state/list'

      return axios.post(getApiURL()+url,{
          id_pais : !id_vzla? this.id_pais : id_vzla
      })
      .then(response => {
        if(!id_vzla){
          this.provincias = response.data.data;
        }else{
          this.estados = response.data.data;
        }
      })
      .catch(error => {

      });
    },
    getMunicipios : function(){

      return axios.post(getApiURL()+'/location/municipio/list',{
          id_estado : this.id_estado
      })
      .then(response => {
          this.municipios = response.data.data;
          this.parroquias = [];
      })
      .catch(error => {

      });
    },
    getParroquias : function(){

      axios.post(getApiURL()+'/location/parroquia/list',{
          id_municipio : this.id_municipio
      })
      .then(response => {
          this.parroquias = response.data.data;
      })
      .catch(error => {

      });
    },
    getCarreras : function(){

      axios.post(getApiURL()+'/carrera/registradas')
      .then(response => {
          this.carreras = response.data.data;
      })
      .catch(error => {

      });
    },
    registrar_profesor : function(){

      Swal.fire({
        width: 550,
        title: 'Confirmación',
        icon: 'info',
        html: '¿Confirma el registro?',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        showLoaderOnConfirm: true,
        preConfirm: () => {

          this.profesor.asignaturas_impartir = this.asignaturas_impartir;
          return axios.put(getApiURL() +'/profesor/registrar', {
            profesor : this.profesor
          })
          .then(response => {

            if(response.status != '200') {
              throw new Error(response.statusText)
            }
            return response.data.data;
          })
         .catch(error => {

           if(error.response.data.error.status_code == '422'){
             Swal.showValidationMessage(
               `Llene los campos.`
             )
           }else{
             Swal.showValidationMessage(
               `Request fail: ${error}`
             )
           }
         });
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then(result => {
        if(result.value){
          Swal.fire({
            width: 650,
            icon: 'success',
            title: 'Registro realizado.'
          })

          this.preinscripcion = {};
        }
      })
    },
    update_profesor : function(){

      Swal.fire({
        width: 600,
        title: 'Confirmación',
        icon: 'info',
        html: '¿Esta seguro de modificar este profesor?',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return axios.put(getApiURL() +'/profesor/modificar', {
            profesor : this.profesor
          })
          .then(response => {

            if(response.status != '200') {
              throw new Error(response.statusText)
            }
            return response.data.data;
          })
         .catch(error => {

           if(error.response.data.error.status_code == '422'){
             Swal.showValidationMessage(
               `Verifique que los campos esten rellenados.`
             )
           }else{
             Swal.showValidationMessage(
               `Request fail: ${error}`
             )
           }
         });
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then(result => {
          if(result.value){
            Swal.fire({
              width: 650,
              icon: 'success',
              title: 'Modificado correctamente.'
            })
            this.getProfesores();
            this.profesor = {};
            this.filtro = '';
            this.profesor_selected = false;
          }
      })
    },
    deleteProfesor : function(id_persona){

      Swal.fire({
        width: 600,
        title: 'Confirmación',
        icon: 'warning',
        html: '¿Esta seguro de eliminar?',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return axios.post(getApiURL()+'/profesor/delete', {
            id_persona : id_persona
          })
          .then(response => {
            if (response.status != '200') {
              throw new Error(response.statusText)
            }
            return response.data.data;
          })
         .catch(error => {
           Swal.showValidationMessage(
             `Request fail: ${error}`
           )
         });
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then(result => {
          if(result.value){
            Swal.fire({
              width: 650,
              icon: 'success',
              title: 'Eliminado con exito'
            })
            this.getProfesores();
            this.profesor = {};
            this.profesor_selected = false;
          }
      })
    },
    addAsignaturaImpartir : function(id_asignatura, index_trayecto, index_asig){

      if(!this.profesor_selected){

        if($("#customCheck"+index_trayecto+'-'+index_asig).prop('checked')){

          if(this.asignaturas_impartir.find((asig, index) => index == index_trayecto) == undefined || this.asignaturas_impartir.find((asig, index) => index == index_trayecto) == null){
            Vue.set(this.asignaturas_impartir, index_trayecto, [])
          }
          this.asignaturas_impartir[index_trayecto].push(id_asignatura)
        }else{

          _.remove(this.asignaturas_impartir, function(e){

            return e === id_asignatura
          })
        }
      }else{

        if($("#customCheck"+index_trayecto+'-'+index_asig).prop('checked')){

            this.asignaturas_impartir.push(id_asignatura)
        }else{

          _.remove(this.asignaturas_impartir, function(e){

            return e === id_asignatura
          })
        }
      }
    },
    updateAsignaturasImpartidas : function(){

      Swal.fire({
        width: 550,
        title: 'Confirmación',
        icon: 'info',
        html: '¿Esta seguro de modificar las asignaturas impartidas?',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        showLoaderOnConfirm: true,
        preConfirm: () => {

          let asignaturas = []
          $(".custom-control-checkbox:checked").each(function(e, i){
            asignaturas.push($(i).val())
          })

          return axios.put(getApiURL() +'/profesor/update_asignaturas_impartidas', {
            id_profesor : this.profesor.id,
            asignaturas : asignaturas
          })
          .then(response => {

            if(response.status != '200') {
              throw new Error(response.statusText)
            }
            return response.data.data;
          })
         .catch(error => {

           if(error.response.data.error.status_code == '422'){

             if(error.response.data.error.code == '0'){
               Swal.showValidationMessage(
                 `Llene los campos.`
               )
             }else if(error.response.data.error.code == '2'){
                Swal.showValidationMessage(
                  error.response.data.error.message
                )
             }else if(error.response.data.error.code == '3'){
                Swal.showValidationMessage(
                  error.response.data.error.message
                )
             }
           }else{
             Swal.showValidationMessage(
               `Request fail: ${error}`
             )
           }
         });
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then(result => {
        if(result.value){
          Swal.fire({
            width: 650,
            icon: 'success',
            title: 'Actualización realizada.'
          })

          this.pensum = result.value;
        }
      })
    },
    deleteRow : function(){

      this.pensum.splice((this.pensum.length-1), 1)
      this.asignaturas_impartir.splice((this.asignaturas_impartir.length-1), 1)
    },
    addRow : function(){

      this.pensum.push(
        {
          trayectos_aca : [],
          asignaturas : []
        }
      )
    },
    cancel : function(){
      this.profesor = {};
      this.filtro = '';
      this.profesor_selected = false;
      this.deploy_form = false;
    }
  }
});

Vue.component('preinscripcion',
{
  template:`
  <div :style="Styles.marginTop">
    <center v-if="!form_update">
      <h1 class="display-4">
        Preinscripción de estudiante
      </h1>
    </center>
    <div class="card bg-light mb-3">
      <div class="card-body">
        <div class="row">
          <div class="col-md-12 col-sm-12 col-lg-12">
            <div class="form-horizontal">
	            <div class="form-group">
                <label class="col-md-3 offset-md-1 col-form-label col-form-label-lg">Cédula</label>
                <div class="col-md-2 offset-md-1 input-group">
                  <input v-model="preinscripcion.cedula" type="text" class="form-control" id="cedula" name="cedula" placeholder="cédula">
                </div>
	            </div>
	            <div class="form-group"> <!-- Full Name -->
                <label class="col-md-3 offset-md-1 col-form-label-lg">Nombres</label>
                <div class="col-md-9 offset-md-1 input-group">
                  <input v-model="preinscripcion.nombre_uno"type="text" class="form-control custom-control-inline" id="nombre_uno" name="nombre_uno" placeholder="Primer nombre" style="width: 40%;" >
                  <input v-model="preinscripcion.nombre_dos" type="text" class="form-control custom-control-inline" id="nombre_dos" name="nombre_dos" placeholder="Segundo nombre" style="width: 40%;">
                </div>
	            </div>
	            <div class="form-group"> <!-- Street 1 -->
                <label class="col-md-3 offset-md-1 col-form-label-lg">Apellidos</label>
                <div class="col-md-9 offset-md-1 input-group">
                  <input v-model="preinscripcion.apellido_uno"type="text" class="form-control custom-control-inline" id="apellido_uno" name="apellido_uno" placeholder="Primer apellido" style="width: 40%;" >
                  <input v-model="preinscripcion.apellido_dos" type="text" class="form-control custom-control-inline" id="apellido_dos" name="apellido_dos" placeholder="Segundo apellido" style="width: 40%;">
                </div>
	            </div>
              <div class="form-group">
                <label class="col-md-2 offset-md-1 col-form-label-lg">Nacionalidad:</label>
                <div class="col-md-3 offset-md-1 input-group">
                  <div class="form-check form-check-inline">
                    <input v-model="preinscripcion.nacionalidad" type="radio" class="form-check-input" id="Vene" value="V" name="nacionalidad">
                    <label class="form-check-label" for="Vene">Venezolano</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input v-model="preinscripcion.nacionalidad" type="radio" class="form-check-input" id="Extr" value="E" name="nacionalidad">
                    <label class="form-check-label" for="Extr">Extranjero</label>
                  </div>
                </div>
	            </div>
	            <div class="form-group"> <!-- Street 2 -->
                <label class="col-md-1 offset-md-1 col-form-label-lg">Sexo</label>
                <div class="col-md-3 offset-md-1 input-group">
                  <div class="form-check form-check-inline">
                    <input v-model="preinscripcion.sexo" type="radio" class="form-check-input" id="Feme" value="F" name="sexo">
                    <label class="form-check-label" for="Feme">Femenino</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input v-model="preinscripcion.sexo" type="radio" class="form-check-input" id="Masc" value="M" name="sexo">
                    <label class="form-check-label" for="Masc">Masculino</label>
                  </div>
                </div>
	            </div>
              <div class="form-group"> <!-- Street 2 -->
                <label class="col-md-4 offset-md-1 col-form-label-lg">Correo Electrónico</label>
                <div class="col-md-3 offset-md-1 input-group">
                  <input v-model="preinscripcion.email" type="text" class="form-control" id="email" name="email" placeholder="Ingrese su Correo Electrónico">
                </div>
	            </div>
	            <div class="form-group"> <!-- Street 2 -->
                <label for="street2_id" class="col-md-4 offset-md-1 col-form-label-lg">Fecha de Nacimiento</label>
                <div class="col-md-3 offset-md-1 input-group">
                    <input v-model="preinscripcion.fecha_nac" type="date" class="form-control" id="fecha_nac" name="fecha_nac" placeholder="">
                </div>
	            </div>
	            <div class="form-group"> <!-- Street 2 -->
                <label for="id_pais" class="col-md-4 offset-md-1 col-form-label-lg">Lugar de Nacimiento</label>
                <div class="col-md-8 offset-md-1 input-group">
                  <select class="form-control custom-control-inline select-local" id="id_pais_nac" name="pais" v-model="id_pais" @change="getProvincias()" style="width: 25%;">
                  	<option v-for="pais in paises" :value="pais.id">{{ pais.pais }}</option>
                  </select>
                  <select class="form-control custom-control-inline select-local" id="id_provincia_nac" name="provincia" v-model="preinscripcion.id_provincia_nac" style="width: 30%;">
                    <option v-for="provincia in provincias" :value="provincia.id">{{ provincia.provincia }}</option>
                  </select>
                </div>
	            </div>
	            <div class="form-group"> <!-- Street 2 -->
                <label class="col-md-3 offset-md-1 col-form-label-lg">Localización</label>
                <div class="col-md-8 offset-md-1 input-group">
                  <select class="form-control custom-control-inline select-local" id="estado" name="estado" v-model="id_estado" @change="getMunicipios" style="width: 30%;">
                  	<option v-for="estado in estados" :value="estado.id">{{ estado.estado }}</option>
                  </select>
                    <select class="form-control custom-control-inline select-local" id="local_municipio" v-model="id_municipio" @change="getParroquias" name="municipio" style="width: 30%;">
                    <option v-for="municipio in municipios" :value="municipio.id">{{ municipio.municipio }}</option>
                  </select>
                  <select class="form-control custom-control-inline select-local" id="local_parroquia" name="parroquia" v-model="preinscripcion.id_parroquia" style="width: 30%;">
                    <option v-for="parroquia in parroquias" :value="parroquia.id">{{ parroquia.parroquia }}</option>
                  </select>
                </div>
	            </div>
	             <div class="form-group"> <!-- Street 2 -->
                <label for="direccion" class="col-md-3 offset-md-1 col-form-label-lg">Direccion</label>
                <div class="col-md-5 offset-md-1 input-group">
                  <input v-model="preinscripcion.direccion" type="text" class="form-control" id="local_direccion" name="local_direccion" placeholder="">
                </div>
	            </div>
	            <div class="form-group"> <!-- Zip Code-->
                <label for="id_carrera" class="col-md-3 offset-md-1 col-form-label-lg">Carrera</label>
                <div class="col-md-4 offset-md-1 input-group">
                  <select v-model="preinscripcion.id_carrera" class="form-control" id="id_carrera" name="carrera">
                  	<option v-for="carrera in carreras" :value="carrera.id">{{ carrera.carrera }}</option>
                  </select>
                </div>
	            </div>
	            <div class="form-group"> <!-- Street 2 -->
                <label class="col-md-3 offset-md-1 col-form-label-lg discapacidad">
                  ¿Presenta Discapacidad?
                </label>
                <div class="col-md-9 offset-md-1" >
                  <div class="form-check form-check-inline">
                    <input v-model="preinscripcion.discapacidad" type="radio" class="form-check-input" id="Si" value="Si" name="discapacidad">
                    <label class="form-check-label" for="Si">Si</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input v-model="preinscripcion.discapacidad" type="radio" class="form-check-input" id="No" value="No" name="discapacidad">
                    <label class="form-check-label" for="No">No</label>
                  </div>
                </div>
                <div v-if="preinscripcion.discapacidad == 'Si'">
                  <div class="form-group">
                    <div class="col-md-8  offset-md-1" >
                      <label class="col-md-5 col-form-label-lg">
                        Nivel de Discapacidad
                      </label>
                      <div class="col-md-7" >
                        <div class="form-check form-check-inline">
                          <input v-model="preinscripcion.nivel_discapacidad" type="radio" class="form-check-input" id="Leve" value="Leve" disabled="true" name="nivel_discapacidad">
                          <label class="form-check-label" for="Leve">Leve</label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input v-model="preinscripcion.nivel_discapacidad" type="radio" class="form-check-input" id="Moderado" value="Moderado" disabled="true" name="nivel_discapacidad">
                          <label class="form-check-label" for="Moderado">Moderado</label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input v-model="preinscripcion.nivel_discapacidad" type="radio" class="form-check-input" id="Severo" value="Severo" disabled="true" name="nivel_discapacidad">
                          <label class="form-check-label" for="Severo">Severo</label>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-8  offset-md-1" >
                        <label for="des_discapacidad" class="col-md-6 col-form-label-lg">
                          Describe su discapacidad
                        </label>
                        <div class="col-md-10 input-group">
                          <input v-model="preinscripcion.desc_discapacidad" type="text" class="form-control" id="des_discapacidad" disabled="true" name="des_discapacidad" placeholder="">
                        </div>
                    </div>
                  </div>
                </div>
	            </div>
	            <div class="form-group">
                <label for="opsu" class="col-md-4 offset-md-1 col-form-label-lg opsu">
                  ¿Hizo registro en OPSU?
                </label>
                <div class="col-md-7 offset-md-1">
                  <div class="form-check form-check-inline">
                    <input v-model="preinscripcion.registro_opsu" type="radio" class="form-check-input" id="opsu_Si" value="Si" name="opsu">
                    <label class="form-check-label" for="opsu_Si">Si</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input v-model="preinscripcion.registro_opsu" type="radio" class="form-check form-check-input" id="opsu_No" value="No" name="opsu">
                    <label class="form-check-label" for="opsu_No">No</label>
                  </div>
                </div>
	            </div>
	            <div class="form-group"> <!-- Full Name -->
                <label class="col-md-5 offset-md-1 col-form-label-lg">Ingrese Institución de Bachillerato</label>
                <div class="col-md-6 offset-md-1 input-group">
                  <input v-model="preinscripcion.instituto_bachillerato" type="text" class="form-control custom-control-inline" id="inst_bachillerato" name="inst_bachillerato" placeholder="Ingrese institución de Bachillerato donde se fue egresado">
                </div>
	            </div>
	            <div class="form-group"> <!-- Full Name -->
                <label class="col-md-4 offset-md-1 col-form-label-lg">Año de Egreso</label>
                <div class="col-md-2 offset-md-1 input-group">
                  <input v-model="preinscripcion.anio_egreso" type="number" class="form-control custom-control-inline" id="anio_egreso" name="anio_egreso" placeholder="Ej. 2018">
                </div>
	            </div>
              <div v-if="form_update" class="col-md-12 mb-3">
                <div class="row justify-content-center">
                  <div class="col-md-4 text-md-center">
                    <button type="submit" class="btn btn-success" @click="update_trayecto()">Actualizar datos</button>
                  </div>
                </div>
              </div>
	            <div class="col-md-12">
                <h5 class="card-title offset-md-1">
                	Requisitos de ingreso
                </h5>
              </div>
  	    			<p class="card-text offset-md-1">
  	    				(A partir del MARTES 15/10/2019 los bachilleres preinscritos mediante este formulario, deben consignar en una (01) carpeta MARRÓN tamaño oficio en buen estado con gancho, los documentos que se mencionan a continuación CON VISTA DEL ORIGINAL, organizados en el siguiente orden:
  	    			</p>
              <div v-if="!form_update" class="col-md-12">
                <div  v-for="requisito in requisitos" class="form-check offset-md-1">
                  <input class="form-check-input" type="checkbox" v-model="preinscripcion.requisitos_pendientes" :value="requisito.id" :id="'defaultCheck'+requisito.id">
                  <label class="form-check-label" :for="'defaultCheck'+requisito.id">
                    {{ requisito.requisito }}
                  </label>
                </div>
              </div>
              <div v-else class="col-md-12">
                <div v-for="requisito in preinscripcion.requisitos_pendientes" class="form-check offset-md-1">
                  <input class="form-check-input" type="checkbox" :id="'defaultCheck'+requisito.id" checked>
                  <label class="form-check-label" :for="'defaultCheck'+requisito.id">
                    {{ requisito.requisito }}
                  </label>
                </div>
              </div>
	            <div v-if="!form_update" class="col-md-12 mt-3">
                <div class="alert alert-warning" role="alert">
                    <label>Por favor verifique los datos ingresados antes de registrar.</label>
                </div>
	            </div>
	            <div v-if="!form_update" class="col-md-12">
                <div class="row justify-content-center">
                  <div class="col-md-2">
                    <button type="submit" class="btn btn-primary" id="registrar_pre" @click="register_preinscripcion">Preinscribir</button>
                  </div>
                </div>
	            </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="deploy_component" class="col-sm-12 col-md-12 col-lg-12">
        <validacion-preinscripcion :prop_id_persona="preinscripcion.id_persona" :prop_id_carrera="preinscripcion.id_carrera" :carreras="carreras">
        </validacion-preinscripcion>
      </div>
    </div>
  </div>
  `,
  props : ['form_update'],
  data() {
    return {
      Styles : {
        middleAlign : {
          'vertical-align': 'middle'
        },
        marginBottom : {
          'margin-bottom' : '15px'
        },
        marginTop : {
          'margin-top' : '15px'
        },
        scrollX : {
          'overflow-x' : 'auto',
          'white-space' : 'nowrap'
        }
      },
      filtro : '',
      id_pais : '',
      id_estado : '',
      id_municipio : '',
      paises : [],
      provincias : [],
      estados : [],
      municipios : [],
      parroquias : [],
      carreras : [],
      requisitos : [],
      preinscripcion : {
        requisitos_pendientes : []
      },
      deploy_component : false
    }
  },
  created(){
    data.component_preinscripcion = this
    this.getCarreras()
    this.getRequisitos()

    if(this.form_update == true){

      this.getPreinscrito(data.component_preinscritos.preinscrito.id).then(() => {

        this.deploy_component = true
      }).then(() => {

        this.getPaises()
      }).then(() => {

        this.id_pais = this.preinscripcion.id_pais
        this.getProvincias();
      })
      this.getProvincias(95).then(() => {

        this.id_estado = this.preinscripcion.id_estado
        this.getMunicipios();
      }).then(() => {

        this.id_municipio = this.preinscripcion.id_municipio
        this.getParroquias();
      })
    }else{

      this.getPaises()
      this.getProvincias(95)
    }
  },
  methods:{
    getPreinscrito : function(id_preinscrito){

      return axios.post(getApiURL()+'/estudiante/get_preinscrito',{
        id_preinscrito : id_preinscrito
      })
      .then(response => {

        this.preinscripcion = response.data.data;
      })
      .catch(error => {

      });
    },
    getPaises : function (){

      return axios.post(getApiURL()+'/location/list')
      .then(response => {
          this.paises = response.data.data;
      })
      .catch(error => {

      });
    },
    getProvincias : function(id_vzla = null){

      let url = ''
      !id_vzla? url = '/location/province/list' : url = '/location/state/list'

      return axios.post(getApiURL()+url,{
          id_pais : !id_vzla? this.id_pais : id_vzla
      })
      .then(response => {
        if(!id_vzla){
          this.provincias = response.data.data;
        }else{
          this.estados = response.data.data;
        }
      })
      .catch(error => {

      });
    },
    getMunicipios : function(){

      return axios.post(getApiURL()+'/location/municipio/list',{
          id_estado : this.id_estado
      })
      .then(response => {
          this.municipios = response.data.data;
          this.parroquias = [];
      })
      .catch(error => {

      });
    },
    getParroquias : function(){

      axios.post(getApiURL()+'/location/parroquia/list',{
          id_municipio : this.id_municipio
      })
      .then(response => {
          this.parroquias = response.data.data;
      })
      .catch(error => {

      });
    },
    getCarreras : function(){

      axios.post(getApiURL()+'/carrera/registradas')
      .then(response => {
          this.carreras = response.data.data;
      })
      .catch(error => {

      });
    },
    getRequisitos : function(){

      axios.post(getApiURL()+'/estudiante/get_requisitos')
      .then(response => {
          this.requisitos = response.data.data;
      })
      .catch(error => {

      });
    },
    register_preinscripcion : function(){

      Swal.fire({
        width: 550,
        title: 'Confirmación',
        icon: 'info',
        html: '¿Confirma su preinscripción?',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return axios.put(getApiURL() +'/estudiante/preinscribir', {
            preinscripcion : this.preinscripcion
          })
          .then(response => {

            if(response.status != '200') {
              throw new Error(response.statusText)
            }
            return response.data.data;
          })
         .catch(error => {

           if(error.response.data.error.status_code == '422'){
             Swal.showValidationMessage(
               `Llene los campos.`
             )
           }else{
             Swal.showValidationMessage(
               `Request fail: ${error}`
             )
           }
         });
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then(result => {
        if(result.value){
          Swal.fire({
            width: 650,
            icon: 'success',
            title: 'Registro realizado.'
          })

          this.preinscripcion = {};
        }
      })
    },
    cancel : function(){
      this.trayecto_aca = {};
      this.filtro = '';
      this.trayecto_selected = false;
      this.deploy_form = false;
    }
  }
});

Vue.component('validacion-preinscripcion',
{
  template:`
  <div :style="Styles.marginTop">
    <div class="card bg-light mb-3">
      <div class="card-body">
        <div class="row">
          <div class="col-md-12 col-sm-12 col-lg-12">
          <center>
            <h1 class="display-4">Actualizar inscripción</h1>
          </center>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-6">
            <div class="form-group">
              <label for="id_carrera" class="col-md-3 offset-md-1 col-form-label col-form-label-lg">Carrera</label><br/><br/>
              <div class="col-md-8 offset-md-1">
                <select @change="getTrayectosAca" v-model="inscripcion.id_carrera" class="form-control" id="id_carrera" name="carrera">
                  <option v-for="carrera in carreras" :value="carrera.id">{{ carrera.carrera }}</option>
                </select>
              </div>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-6">
            <div v-if="false" class="form-group">
              <label for="id_mencion" class="col-md-3 offset-md-1 col-form-label col-form-label-lg" >Mención</label><br/><br/>
              <div class="col-md-6 offset-md-1">
                <select class="form-control" id="id_mencion" name="mencion" v-model="inscripcion.id_mencion" :disabled="menciones.length > 0? false:true">
                  <option v-for="mencion in menciones" :value="mencion.id">{{ mencion.mencion }}</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label for="id_mencion" class="col-md-5 offset-md-1 col-form-label col-form-label-lg" >Trayecto academico</label><br/><br/>
              <div class="col-md-6 offset-md-1">
                <select @change="getSeccionesDisponibles" class="form-control custom-control-inline" id="id_trayecto" name="trayecto">
                  <option value="" selected>Seleccione</option>
                  <option v-for="trayecto in trayectos_academicos" :value="trayecto.id">{{ trayecto.trayecto }}</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-6">
            <div class="form-group">
              <label for="id_cohorte" class="col-md-3 offset-md-1 col-form-label col-form-label-lg">Cohorte</label>
              <div class="col-md-3 offset-md-1">
                <input type="number" class="form-control" :value="date_cohorte" readonly>
              </div>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-6">
            <div class="form-group"> <!-- Zip Code-->
              <label for="id_condicion" class="col-md-3 offset-md-1 col-form-label col-form-label-lg">Condición</label>
              <div class="col-md-6 offset-md-1">
                <select class="form-control" id="id_condicion" v-model="inscripcion.id_condicion" name="condicion">
                  <option value="" selected>Seleccione condición.</option>
                  <option v-for="condicion in condiciones" :value="condicion.id">{{ condicion.condicion }}</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-6">
            <div class="form-group">
              <label for="id_estatus1" class="col-md-6 offset-md-1 col-form-label col-form-label-lg">Estatus uno</label>
              <div class="col-md-6 offset-md-1 input-group">
                <select class="form-control" id="id_estatus1" v-model="inscripcion.id_estatus1" name="estatus_uno">
                  <option value="" selected>Seleccione estatus 1.</option>
                  <option v-for="status in status1" :value="status.id">{{ status.estatus1 }}</option>
                </select>
              </div>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-6">
            <div class="form-group">
              <label for="id_estatus1" class="col-md-6 offset-md-1 col-form-label col-form-label-lg">Estatus dos</label>
              <div class="col-md-6 offset-md-1 input-group">
                <select class="form-control" id="id_estatus2" v-model="inscripcion.id_estatus2" name="estatus_dos">
                  <option value="" selected>Seleccione estatus 2.</option>
                  <option v-for="status in status2" :value="status.id">{{ status.estatus2 }}</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12 col-md-12 col-lg-12">
            <div class="card-header">
              <h5 style="margin: 0">
                Secciones disponibles:
              </h5>
            </div>
            <div class="form-group card card-body">
              <div id="container-secciones">
                <div v-for="(seccion, index) in available_secciones" class="form-group row">
                  <div v-if="index > 0" class="col-md-12">
                    <hr>
                  </div>
                  <div class="col-md-4">
                    <h4>
                      Sección:
                      <small class="text-muted">{{ seccion.codigo }}</small>
                    </h4>
                  </div>
                  <div class="col-md-2">
                    <h4>
                      Cupos:
                      <small class="text-muted">{{ seccion.cupos }}</small>
                    </h4>
                  </div>
                  <div class="col-md-3 text-md-center">
                    Carga completa
                    <div class="custom-control custom-switch">
                      <input type="checkbox" :class="'custom-control-input rowSecc'+index" @click="toggleCargaCompleta(index)" :id="'customSwitch'+index">
                      <label class="custom-control-label" :for="'customSwitch'+index"></label>
                    </div>
                  </div>
                  <div class="col-md-3">
                    <h4>
                      Restantes:
                      <small class="text-muted">{{ seccion.cupos - seccion.cupos_ocupados }}</small>
                    </h4>
                  </div>
                  <div class="col-md-12">
                    <a class="" data-toggle="collapse" :href="'#collapseAsignaturas'+index" role="button" aria-expanded="false" aria-controls="collapseExample">
                      Desplegar carga academica
                    </a>
                    <div class="collapse" :id="'collapseAsignaturas'+index">
                      <div class="card card-body">
                        <div class="row">
                          <div v-for="asignatura in seccion.carga_academica" class="col-md-6">
                            <ul class="list-group">
                              <li class="list-group-item">
                                {{ asignatura.desc_asignatura }}
                                <label style="float:right;">
                                  Añadir
                                  <input type="checkbox" :class="'checksAsig rowSecc'+index" :data-id_asignatura="asignatura.id" :value="asignatura.id_oferta_academica" @click="toggleAsignaturaInscribir"></input>
                                </label>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class="row justify-content-center">
            <div class="col-md-12">
              <div class="text-center">
                <button type="submit" class="btn btn-primary" id="actualizar" @click="actualizar_inscripcion">Inscribir</button>
                <div class="float-right">
                    <button type="button" class="btn btn-secondary" id="cancelar" @click="cancel">Cancelar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `,
  props : ['prop_id_persona', 'prop_id_carrera', 'carreras'],
  data() {
    return {
      Styles : {
        middleAlign : {
          'vertical-align': 'middle'
        },
        marginBottom : {
          'margin-bottom' : '15px'
        },
        marginTop : {
          'margin-top' : '15px'
        }
      },
      inscripcion : {
        id_persona : this.prop_id_persona,
        id_carrera : this.prop_id_carrera,
        id_mencion : '',
        id_condicion : '',
        id_estatus1 : '',
        id_estatus2 : '',
        asignaturas_seleccionadas : [],
      },
      date_cohorte : moment().format('YYYY'),
      trayectos_academicos : [],
      menciones : [],
      condiciones : [],
      status1 : [],
      status2 : [],
      available_secciones : [],
      preinscripcion : {
        requisitos_pendientes : []
      }
    }
  },
  created(){
    this.getCondiciones()
    this.getStatus()
    this.getTrayectosAca()
  },
  methods:{
    getTrayectosAca : function(){

      axios.post(getApiURL()+'/trayecto/dinamic_list',{
        id_carrera : this.inscripcion.id_carrera
      })
      .then(response => {
          this.trayectos_academicos = response.data.data;
      })
      .catch(error => {

      });
    },
    getSeccionesDisponibles : function(value){

      axios.post(getApiURL()+'/oferta_academica/get_available_secciones',{
        id_trayectoAca : value.currentTarget.value
      })
      .then(response => {
          this.available_secciones = response.data.data;
      })
      .catch(error => {
        let errorResponse = error.response.data.error;
        if(errorResponse.status_code == 422){
          $("#container-secciones").html('<center><h3>'+error.response.data.error.message+'</h3></center>')
        }
      });
    },
    toggleSeccion : function(seccion, index){

      if($("input.toggle-secciones:checked:not(#customSwitch"+index+")").length != 0)
        this.available_secciones[$("input.toggle-secciones:checked:not(#customSwitch"+index+")").parent().parent().parent().index()].cupos_ocupados--;
      $("input.toggle-secciones:checked").not("#customSwitch"+index).prop('checked', false)
      if($("#customSwitch"+index).prop('checked')){

        this.inscripcion.id_seccion = seccion.id
        seccion.cupos_ocupados++;
      }else{

        this.inscripcion.id_seccion = ''
      }
    },
    getMenciones : function(){

      axios.post(getApiURL()+'/mencion/get_menciones',{
        id_carrera : this.inscripcion.id_carrera
      })
      .then(response => {
          this.menciones = response.data.data;
      })
      .catch(error => {

      });
    },
    getCondiciones : function(){

      axios.post(getApiURL()+'/condicion/get_condiciones')
      .then(response => {
          this.condiciones = response.data.data;
      })
      .catch(error => {

      });
    },
    getStatus : function(){

      axios.post(getApiURL()+'/estudiante/get_status')
      .then(response => {
          this.status1 = response.data.data[0];
          this.status2 = response.data.data[1];
      })
      .catch(error => {

      });
    },
    toggleAsignaturaInscribir : function(e){

      let elemento = $(e.currentTarget);

      if(elemento.prop('checked')){

        axios.post(getApiURL()+'/oferta_academica/check_hour_availability', {
          id_clase : this.id_clase
        })
        .catch(error => {
          let clase = error.response.data.data;
          Swal.fire({
            width: 650,
            icon: 'error',
            title: 'Aula ocupada',
            timerProgressBar : true,
            timer : 2500,
            showConfirmButton : false,
            html : '<h3>Ya existe una clase en ese lapso de horas<br>'+clase.inicio+' - '+clase.final+'</h3>'
          })
        });

        _.remove(this.inscripcion.asignaturas_seleccionadas, function(e){
          return e.id_asignatura === elemento.attr('data-id_asignatura')
        })
        $('input[type=checkbox].custom-control-input:checked').prop('checked', false)
        $('input[type=checkbox][data-id_asignatura='+elemento.attr('data-id_asignatura')+'][value!='+elemento.val()+']:checked').prop('checked', false)
        this.inscripcion.asignaturas_seleccionadas.push({'id_asignatura' : elemento.attr('data-id_asignatura'), 'id_oferta_academica' : elemento.val()})

        if($('input[type=checkbox].checksAsig.'+elemento.attr('class').split(' ')[1]+':checked').length == $('input[type=checkbox].checksAsig.'+elemento.attr('class').split(' ')[1]).length)
          $('input[type=checkbox].custom-control-input.'+elemento.attr('class').split(' ')[1]).prop('checked', true)
      }else{

        _.remove(this.inscripcion.asignaturas_seleccionadas, function(e){
          return e.id_oferta_academica === elemento.val()
        })
        $('input[type=checkbox].custom-control-input.'+elemento.attr('class').split(' ')[1]+':checked').prop('checked', false)
      }

    },
    toggleCargaCompleta : function(index){

      if($('input[type=checkbox].checksAsig:not(.rowSecc'+index+'):checked').length > 0){

        this.inscripcion.asignaturas_seleccionadas = []
        $('input[type=checkbox].custom-control-input:not(#customSwitch'+index+'):checked').prop('checked', false)
        $('input[type=checkbox].checksAsig:not(.rowSecc'+index+'):checked').prop('checked', false)
      }

      if($('#customSwitch'+index).prop('checked')){

        let inscripcion = this.inscripcion;
        $('input[type=checkbox].checksAsig.rowSecc'+index).prop('checked', true)
        $('input[type=checkbox].checksAsig.rowSecc'+index+':checked').each(function(i, e){
          inscripcion.asignaturas_seleccionadas.push({'id_asignatura' : $(e).attr('data-id_asignatura'), 'id_oferta_academica' : $(e).val()})
        })
      }else{

        this.inscripcion.asignaturas_seleccionadas = []
        $('input[type=checkbox].checksAsig.rowSecc'+index+':checked').prop('checked', false)
      }
    },
    actualizar_inscripcion : function(){

      Swal.fire({
        width: 550,
        title: 'Confirmación',
        icon: 'info',
        html: '¿Confirma la inscripción del estudiante?',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return axios.put(getApiURL() +'/estudiante/confirmarInscripcion', {
            inscripcion : this.inscripcion
          })
          .then(response => {

            if(response.status != '200') {
              throw new Error(response.statusText)
            }
            return response.data.data;
          })
         .catch(error => {

           if(error.response.data.error.status_code == '422'){
             Swal.showValidationMessage(
               `Llene los campos.`
             )
           }else{
             Swal.showValidationMessage(
               `Request fail: ${error}`
             )
           }
         });
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then(result => {
        if(result.value){
          Swal.fire({
            width: 650,
            icon: 'success',
            title: 'Inscripción realizada.'
          })
          this.inscripcion = {};
          data.component_preinscripcion.deploy_component = false;
          data.component_preinscripcion.preinscripcion = {};
          data.component_preinscritos.filtro = '';
          data.component_preinscritos.preinscrito_selected = false;
          data.component_preinscritos.get_preinscritos();
        }
      })
    },
    cancel : function(){
      this.inscripcion = {};
      data.component_preinscripcion.deploy_component = false;
      data.component_preinscripcion.preinscripcion = {};
      data.component_preinscritos.filtro = '';
      data.component_preinscritos.preinscrito_selected = false;
    }
  }
});

Vue.component('manage-estudiantes',
{
  template:`
  <div :style="Styles.marginTop">
    <center>
      <h1 class="display-4">
        Gestion de estudiantes
      </h1>
    </center>
    <div class="card bg-light mb-3" :style="Styles.marginBottom">
      <div class="card-body">
        <div class="row">
          <div class="col-md-8 col-sm-8 col-lg-8">
            <div class="form-inline">
              <div class="form-group">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-default">Campo de filtrado</span>
                  </div>
                  <input style="margin:0;" type="text" class="form-control" placeholder="" v-model="filtro">
                </div>
              </div>
            </div>
          </div>
          <div :style="Styles.marginBottom" class="text-md-right col-md-4 col-sm-4 col-lg-4">
            <a class="btn btn-primary" :href="preinscripcion" target="_BLANK">Nuevo</a>
          </div>
        </div>
      </div>
      <div class="table-responsive">
        <table id="tabla-estudiantes" class="table table-striped table-hover no-wrap">
            <thead>
                <tr>
                  <th colspan="3">Datos Personales</th>
                  <th colspan="8">Datos Estudiantiles</th>
                </tr>
                <tr>
                  <th>Cedula</th>
                  <th>Nombres</th>
                  <th>Apellidos</th>
                  <th>Ingreso</th>
                  <th>Carrera</th>
                  <th></th>
                </tr>
            </thead>
            <paginate name="estudiantes" :list="tablefilter" :per="5" tag="tbody">
              <tr v-if="estudiantes.length == 0">
                <td :style="Styles.middleAlign" colspan="6">
                  <center>
                    <h4 style="margin: 0;">
                      <label style="margin: 0;">
                        Sin registros
                      </label>
                    </h4>
                  </center>
                </td>
              </tr>
              <tr v-for="estudiante in paginated('estudiantes')">
                <td :style="Styles.middleAlign">
                  {{ estudiante.cedula }}
                </td>
                <td :style="Styles.middleAlign">
                  {{ estudiante.nombres }}
                </td>
                <td :style="Styles.middleAlign">
                  {{ estudiante.apellidos }}
                </td>
                <td :style="Styles.middleAlign">
                  {{ new Date(estudiante.fecha_ingreso).toLocaleDateString('ES-es') }}
                </td>
                <td :style="Styles.middleAlign">
                  {{ estudiante.carrera }}
                </td>
                <td class="text-right">
                  <button type="button" class="btn btn-primary btn-sm" @click="get_estudiante(estudiante)"><strong>Modificar</strong></button>
                  <button type="button" class="btn btn-danger btn-sm" @click="delete_estudiante(estudiante.id)"><strong>Eliminar</strong></button>
                </td>
              </tr>
            </paginate>
        </table>
      </div>
    </div>
    <center>
      <h1 class="display-4">
        Datos del estudiante
      </h1>
    </center>
    <div class="row">
      <div class="col-md-12 col-sm-12 col-lg-12">
        <div v-if="estudiante_selected == false && deploy_form == false" class="card bg-light mb-3">
          <div class="card-body">
            <div class="row">
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 mb-12">
                <center>
                  <h1 v-if="estudiantes.length > 0">
                    <small class="text-muted">Pulse <span class="badge badge-primary">Desplegar</span> en la fila del estudiante para ver los campos</small>
                  </h1>
                </center>
              </div>
            </div>
          </div>
        </div>
        <div v-if="estudiante_selected == true" class="card bg-light mb-3">
          <div class="card-body">
            <div class="row">
              <div class="col-md-12 col-sm-12 col-lg-12">
                <div class="form-horizontal">
    	            <div class="form-group">
                    <label class="col-md-3 offset-md-1 col-form-label col-form-label-lg">Cédula</label>
                    <div class="col-md-2 offset-md-1 input-group">
                      <input v-model="estudiante.cedula" type="text" class="form-control" id="cedula" name="cedula" placeholder="cédula">
                    </div>
    	            </div>
    	            <div class="form-group"> <!-- Full Name -->
                    <label class="col-md-3 offset-md-1 col-form-label-lg">Nombres</label>
                    <div class="col-md-9 offset-md-1 input-group">
                      <input v-model="estudiante.nombre_uno"type="text" class="form-control custom-control-inline" id="nombre_uno" name="nombre_uno" placeholder="Primer nombre" style="width: 40%;" >
                      <input v-model="estudiante.nombre_dos" type="text" class="form-control custom-control-inline" id="nombre_dos" name="nombre_dos" placeholder="Segundo nombre" style="width: 40%;">
                    </div>
    	            </div>
    	            <div class="form-group"> <!-- Street 1 -->
                    <label class="col-md-3 offset-md-1 col-form-label-lg">Apellidos</label>
                    <div class="col-md-9 offset-md-1 input-group">
                      <input v-model="estudiante.apellido_uno"type="text" class="form-control custom-control-inline" id="apellido_uno" name="apellido_uno" placeholder="Primer apellido" style="width: 40%;" >
                      <input v-model="estudiante.apellido_dos" type="text" class="form-control custom-control-inline" id="apellido_dos" name="apellido_dos" placeholder="Segundo apellido" style="width: 40%;">
                    </div>
    	            </div>
                  <div class="form-group">
                    <label class="col-md-2 offset-md-1 col-form-label-lg">Nacionalidad:</label>
                    <div class="col-md-3 offset-md-1 input-group">
                      <div class="form-check form-check-inline">
                        <input v-model="estudiante.nacionalidad" type="radio" class="form-check-input" id="Vene" value="V" name="nacionalidad">
                        <label class="form-check-label" for="Vene">Venezolano</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input v-model="estudiante.nacionalidad" type="radio" class="form-check-input" id="Extr" value="E" name="nacionalidad">
                        <label class="form-check-label" for="Extr">Extranjero</label>
                      </div>
                    </div>
    	            </div>
    	            <div class="form-group"> <!-- Street 2 -->
                    <label class="col-md-1 offset-md-1 col-form-label-lg">Sexo</label>
                    <div class="col-md-3 offset-md-1 input-group">
                      <div class="form-check form-check-inline">
                        <input v-model="estudiante.sexo" type="radio" class="form-check-input" id="Feme" value="F" name="sexo">
                        <label class="form-check-label" for="Feme">Femenino</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input v-model="estudiante.sexo" type="radio" class="form-check-input" id="Masc" value="M" name="sexo">
                        <label class="form-check-label" for="Masc">Masculino</label>
                      </div>
                    </div>
    	            </div>
                  <div class="form-group"> <!-- Street 2 -->
                    <label class="col-md-4 offset-md-1 col-form-label-lg">Correo Electrónico</label>
                    <div class="col-md-3 offset-md-1 input-group">
                      <input v-model="estudiante.email" type="text" class="form-control" id="email" name="email" placeholder="Ingrese su Correo Electrónico">
                    </div>
    	            </div>
    	            <div class="form-group"> <!-- Street 2 -->
                    <label for="street2_id" class="col-md-4 offset-md-1 col-form-label-lg">Fecha de Nacimiento</label>
                    <div class="col-md-3 offset-md-1 input-group">
                        <input v-model="estudiante.fecha_nac" type="date" class="form-control" id="fecha_nac" name="fecha_nac" placeholder="">
                    </div>
    	            </div>
    	            <div class="form-group"> <!-- Street 2 -->
                    <label for="id_pais" class="col-md-4 offset-md-1 col-form-label-lg">Lugar de Nacimiento</label>
                    <div class="col-md-8 offset-md-1 input-group">
                      <select class="form-control custom-control-inline select-local" id="id_pais_nac" name="pais" v-model="id_pais" @change="getProvincias()" style="width: 25%;">
                      	<option v-for="pais in paises" :value="pais.id">{{ pais.pais }}</option>
                      </select>
                      <select class="form-control custom-control-inline select-local" id="id_provincia_nac" name="provincia" v-model="estudiante.id_provincia_nac" style="width: 30%;">
                        <option v-for="provincia in provincias" :value="provincia.id">{{ provincia.provincia }}</option>
                      </select>
                    </div>
    	            </div>
    	            <div class="form-group"> <!-- Street 2 -->
                    <label class="col-md-3 offset-md-1 col-form-label-lg">Localización</label>
                    <div class="col-md-8 offset-md-1 input-group">
                      <select class="form-control custom-control-inline select-local" id="estado" name="estado" v-model="id_estado" @change="getMunicipios" style="width: 30%;">
                      	<option v-for="estado in estados" :value="estado.id">{{ estado.estado }}</option>
                      </select>
                        <select class="form-control custom-control-inline select-local" id="local_municipio" v-model="id_municipio" @change="getParroquias" name="municipio" style="width: 30%;">
                        <option v-for="municipio in municipios" :value="municipio.id">{{ municipio.municipio }}</option>
                      </select>
                      <select class="form-control custom-control-inline select-local" id="local_parroquia" name="parroquia" v-model="estudiante.id_parroquia" style="width: 30%;">
                        <option v-for="parroquia in parroquias" :value="parroquia.id">{{ parroquia.parroquia }}</option>
                      </select>
                    </div>
    	            </div>
    	             <div class="form-group"> <!-- Street 2 -->
                    <label for="direccion" class="col-md-3 offset-md-1 col-form-label-lg">Direccion</label>
                    <div class="col-md-5 offset-md-1 input-group">
                      <input v-model="estudiante.direccion" type="text" class="form-control" id="local_direccion" name="local_direccion" placeholder="">
                    </div>
    	            </div>
    	            <div class="form-group"> <!-- Zip Code-->
                    <label for="id_carrera" class="col-md-3 offset-md-1 col-form-label-lg">Carrera</label>
                    <div class="col-md-4 offset-md-1 input-group">
                      <select v-model="estudiante.id_carrera" class="form-control" id="id_carrera" name="carrera">
                      	<option v-for="carrera in carreras" :value="carrera.id">{{ carrera.carrera }}</option>
                      </select>
                    </div>
    	            </div>
    	            <div class="form-group"> <!-- Street 2 -->
                    <label class="col-md-3 offset-md-1 col-form-label-lg discapacidad">
                      ¿Presenta Discapacidad?
                    </label>
                    <div class="col-md-9 offset-md-1" >
                      <div class="form-check form-check-inline">
                        <input v-model="estudiante.discapacidad" type="radio" class="form-check-input" id="Si" value="Si" name="discapacidad">
                        <label class="form-check-label" for="Si">Si</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input v-model="estudiante.discapacidad" type="radio" class="form-check-input" id="No" value="No" name="discapacidad">
                        <label class="form-check-label" for="No">No</label>
                      </div>
                    </div>
                    <div v-if="estudiante.discapacidad == 'Si'">
                      <div class="form-group">
                        <div class="col-md-8  offset-md-1" >
                          <label class="col-md-5 col-form-label-lg">
                            Nivel de Discapacidad
                          </label>
                          <div class="col-md-7" >
                            <div class="form-check form-check-inline">
                              <input v-model="estudiante.nivel_discapacidad" type="radio" class="form-check-input" id="Leve" value="Leve" disabled="true" name="nivel_discapacidad">
                              <label class="form-check-label" for="Leve">Leve</label>
                            </div>
                            <div class="form-check form-check-inline">
                              <input v-model="estudiante.nivel_discapacidad" type="radio" class="form-check-input" id="Moderado" value="Moderado" disabled="true" name="nivel_discapacidad">
                              <label class="form-check-label" for="Moderado">Moderado</label>
                            </div>
                            <div class="form-check form-check-inline">
                              <input v-model="estudiante.nivel_discapacidad" type="radio" class="form-check-input" id="Severo" value="Severo" disabled="true" name="nivel_discapacidad">
                              <label class="form-check-label" for="Severo">Severo</label>
                            </div>
                          </div>
                        </div>
                        <div class="col-md-8  offset-md-1" >
                            <label for="des_discapacidad" class="col-md-6 col-form-label-lg">
                              Describe su discapacidad
                            </label>
                            <div class="col-md-10 input-group">
                              <input v-model="estudiante.desc_discapacidad" type="text" class="form-control" id="des_discapacidad" disabled="true" name="des_discapacidad" placeholder="">
                            </div>
                        </div>
                      </div>
                    </div>
    	            </div>
    	            <div class="form-group">
                    <label for="opsu" class="col-md-4 offset-md-1 col-form-label-lg opsu">
                      ¿Hizo registro en OPSU?
                    </label>
                    <div class="col-md-7 offset-md-1">
                      <div class="form-check form-check-inline">
                        <input v-model="estudiante.registro_opsu" type="radio" class="form-check-input" id="opsu_Si" value="Si" name="opsu">
                        <label class="form-check-label" for="opsu_Si">Si</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input v-model="estudiante.registro_opsu" type="radio" class="form-check form-check-input" id="opsu_No" value="No" name="opsu">
                        <label class="form-check-label" for="opsu_No">No</label>
                      </div>
                    </div>
    	            </div>
    	            <div class="form-group"> <!-- Full Name -->
                    <label class="col-md-5 offset-md-1 col-form-label-lg">Ingrese Institución de Bachillerato</label>
                    <div class="col-md-6 offset-md-1 input-group">
                      <input v-model="estudiante.instituto_bachillerato" type="text" class="form-control custom-control-inline" id="inst_bachillerato" name="inst_bachillerato" placeholder="Ingrese institución de Bachillerato donde se fue egresado">
                    </div>
    	            </div>
    	            <div class="form-group"> <!-- Full Name -->
                    <label class="col-md-4 offset-md-1 col-form-label-lg">Año de Egreso</label>
                    <div class="col-md-2 offset-md-1 input-group">
                      <input v-model="estudiante.anio_egreso" type="number" class="form-control custom-control-inline" id="anio_egreso" name="anio_egreso" placeholder="Ej. 2018">
                    </div>
    	            </div>
                  <div v-if="form_update" class="col-md-12 mb-3">
                    <div class="row justify-content-center">
                      <div class="col-md-4 text-md-center">
                        <button type="submit" class="btn btn-success" @click="update_trayecto()">Actualizar datos</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `,
  data() {
    return {
      Styles : {
        middleAlign : {
          'vertical-align': 'middle'
        },
        marginBottom : {
          'margin-bottom' : '15px'
        },
        marginTop : {
          'margin-top' : '15px'
        },
        scrollX : {
          'overflow-x' : 'auto',
          'white-space' : 'nowrap'
        }
      },
      filtro : '',
      id_pais : '',
      id_estado : '',
      id_municipio : '',
      paises : [],
      provincias : [],
      estados : [],
      municipios : [],
      parroquias : [],
      carreras : [],
      estudiante : {
        cedula : '',
        name : ''
      },
      deploy_form : false,
      estudiantes : [],
      paginate : ['estudiantes'],
      filtro : '',
      estudiante_selected : false
    }
  },
  computed: {
    tablefilter: function(){
      return this.estudiantes.filter(estudiante  => {
        return this.buscarEnObjeto(estudiante, this.filtro);
      });
    }
  },
  created(){
    data.component_estudiantes = this
    this.get_estudiantes()
    this.getCarreras()
  },
  methods:{
    buscarEnObjeto(objeto, input_text){
      for (let key in objeto){
        if (objeto.hasOwnProperty(key) && objeto[key].toString().includes(input_text) ) {
          return true;
        }
      }
      return false;
    },
    get_estudiantes : function() {
      axios.post(getApiURL()+ '/estudiante/get_registrados')
      .then(response => {
        this.estudiantes = response.data.data;
      })
      .catch(error => {
        alert("Ha ocurrido un error")
        //console.log(error);
      });
    },
    get_estudiante : function(estudiante = null){
      this.cancel();
      axios.post(getApiURL()+'/estudiante/get_estudiante',{
        id_estudiante : estudiante.id
      })
      .then(response => {

        this.estudiante = response.data.data;
      })
      .then(response => {

        this.getPaises()
      })
      .then(response => {

        this.id_pais = this.estudiante.id_pais
        this.getProvincias();
      })

      this.getProvincias(95).then(() => {

        this.id_estado = this.estudiante.id_estado
        this.getMunicipios();
      }).then(() => {

        this.id_municipio = this.estudiante.id_municipio
        this.getParroquias();
      })
      .catch(error => {

      });
      this.estudiante_selected = true;
    },
    update_trayecto : function(){

      Swal.fire({
        width: 600,
        title: 'Confirmación',
        icon: 'info',
        html: '¿Esta seguro de modificar este trayecto academico?',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return axios.put(getApiURL() +'/trayecto/update', {
            trayecto : this.trayecto_aca
          })
          .then(response => {

            if(response.status != '200') {
              throw new Error(response.statusText)
            }
            return response.data.data;
          })
         .catch(error => {

           if(error.response.data.error.status_code == '422'){
             Swal.showValidationMessage(
               `Verifique que los campos esten rellenados.`
             )
           }else{
             Swal.showValidationMessage(
               `Request fail: ${error}`
             )
           }
         });
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then(result => {
          if(result.value){
            Swal.fire({
              width: 650,
              icon: 'success',
              title: 'Modificado correctamente.'
            })
            this.get_trayectos();
            this.trayecto_Aca = {};
            this.filtro = '';
            this.trayecto_selected = false;
          }
      })
    },
    delete_trayecto : function(trayecto_id){

      Swal.fire({
        width: 600,
        title: 'Confirmación',
        icon: 'warning',
        html: '¿Esta seguro de eliminar?',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return axios.post(getApiURL()+'/trayecto/delete', {
            trayecto_id : trayecto_id
          })
          .then(response => {
            if (response.status != '200') {
              throw new Error(response.statusText)
            }
            return response.data.data;
          })
         .catch(error => {
           Swal.showValidationMessage(
             `Request fail: ${error}`
           )
         });
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then(result => {
          if(result.value){
            Swal.fire({
              width: 650,
              icon: 'success',
              title: 'Eliminado con exito'
            })
            this.get_trayectos();
            this.trayecto_aca = {};
            this.trayecto_selected = false;
          }
      })
    },
    getPaises : function (){

      return axios.post(getApiURL()+'/location/list')
      .then(response => {
          this.paises = response.data.data;
      })
      .catch(error => {

      });
    },
    getProvincias : function(id_vzla = null){

      let url = ''
      !id_vzla? url = '/location/province/list' : url = '/location/state/list'

      return axios.post(getApiURL()+url,{
          id_pais : !id_vzla? this.id_pais : id_vzla
      })
      .then(response => {
        if(!id_vzla){
          this.provincias = response.data.data;
        }else{
          this.estados = response.data.data;
        }
      })
      .catch(error => {

      });
    },
    getMunicipios : function(){

      return axios.post(getApiURL()+'/location/municipio/list',{
          id_estado : this.id_estado
      })
      .then(response => {
          this.municipios = response.data.data;
          this.parroquias = [];
      })
      .catch(error => {

      });
    },
    getParroquias : function(){

      axios.post(getApiURL()+'/location/parroquia/list',{
          id_municipio : this.id_municipio
      })
      .then(response => {
          this.parroquias = response.data.data;
      })
      .catch(error => {

      });
    },getCarreras : function(){

      axios.post(getApiURL()+'/carrera/registradas')
      .then(response => {
          this.carreras = response.data.data;
      })
      .catch(error => {

      });
    },
    cancel : function(){
      this.trayecto_aca = {};
      this.filtro = '';
      this.trayecto_selected = false;
      this.deploy_form = false;
    }
  }
});

Vue.component('manage-preinscritos',
{
  template:`
  <div :style="Styles.marginTop">
    <center>
      <h1 class="display-4">
        Estudiantes preinscritos
      </h1>
    </center>
    <div class="card bg-light mb-3" :style="Styles.marginBottom">
      <div class="card-body">
        <div class="row">
          <div class="col-md-8 col-sm-8 col-lg-8">
            <div class="form-inline">
              <div class="form-group">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-default">Campo de filtrado</span>
                  </div>
                  <input style="margin:0;" type="text" class="form-control" placeholder="" v-model="filtro">
                </div>
              </div>
            </div>
          </div>
          <div :style="Styles.marginBottom" class="text-md-right col-md-4 col-sm-4 col-lg-4">
            <a class="btn btn-primary" :href="preinscripcion" target="_BLANK">Nuevo</a>
          </div>
        </div>
      </div>
      <div class="table-responsive">
        <table id="tabla-estudiantes" class="table table-striped table-hover no-wrap">
            <thead>
                <tr>
                  <th colspan="3">Datos Personales</th>
                  <th colspan="8">Datos Estudiantiles</th>
                </tr>
                <tr>
                  <th>Cedula</th>
                  <th>Nombres</th>
                  <th>Apellidos</th>
                  <th>Ingreso</th>
                  <th>Carrera</th>
                  <th></th>
                </tr>
            </thead>
            <paginate name="preinscritos" :list="tablefilter" :per="5" tag="tbody">
              <tr v-if="preinscritos.length == 0">
                <td :style="Styles.middleAlign" colspan="6">
                  <center>
                    <h4 style="margin: 0;">
                      <label style="margin: 0;">
                        Sin registros
                      </label>
                    </h4>
                  </center>
                </td>
              </tr>
              <tr v-for="preinscrito in paginated('preinscritos')">
                <td :style="Styles.middleAlign">
                  {{ preinscrito.cedula }}
                </td>
                <td :style="Styles.middleAlign">
                  {{ preinscrito.nombres }}
                </td>
                <td :style="Styles.middleAlign">
                  {{ preinscrito.apellidos }}
                </td>
                <td :style="Styles.middleAlign">
                  {{ new Date(preinscrito.fecha_ingreso).toLocaleDateString('ES-es') }}
                </td>
                <td :style="Styles.middleAlign">
                  {{ preinscrito.carrera }}
                </td>
                <td class="text-right">
                  <button type="button" class="btn btn-primary btn-sm" @click="get_estudiante(preinscrito)"><strong>Modificar</strong></button>
                  <button type="button" class="btn btn-danger btn-sm" @click="delete_preinscrito(preinscrito.id)"><strong>Eliminar</strong></button>
                </td>
              </tr>
            </paginate>
        </table>
      </div>
    </div>
    <center>
      <h1 class="display-4">
        Datos del preinscrito
      </h1>
    </center>
    <div class="row">
      <div class="col-md-12 col-sm-12 col-lg-12">
        <div v-if="preinscrito_selected == false && deploy_form == false" class="card bg-light mb-3">
          <div class="card-body">
            <div class="row">
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 mb-12">
                <center>
                  <h1 v-if="preinscritos.length > 0">
                    <small class="text-muted">Pulse <span class="badge badge-primary">Desplegar</span> en la fila del estudiante para ver los campos</small>
                  </h1>
                </center>
              </div>
            </div>
          </div>
        </div>
        <div v-if="preinscrito_selected">
          <preinscripcion :form_update="true">
          </preinscripcion>
        </div>
      </div>
    </div>
  </div>
  `,
  props : ['preinscripcion'],
  data() {
    return {
      Styles : {
        middleAlign : {
          'vertical-align': 'middle'
        },
        marginBottom : {
          'margin-bottom' : '15px'
        },
        marginTop : {
          'margin-top' : '15px'
        },
        scrollX : {
          'overflow-x' : 'auto',
          'white-space' : 'nowrap'
        }
      },
      filtro : '',
      preinscrito : {
        cedula : '',
        name : ''
      },
      deploy_form : false,
      preinscritos : [],
      paginate : ['preinscritos'],
      filtro : '',
      preinscrito_selected : false
    }
  },
  computed: {
    tablefilter: function(){
      return this.preinscritos.filter(preinscrito  => {
        return this.buscarEnObjeto(preinscrito, this.filtro);
      });
    }
  },
  created(){
    data.component_preinscritos = this
    this.get_preinscritos()
  },
  methods:{
    buscarEnObjeto(objeto, input_text){
      for (let key in objeto){
        if (objeto.hasOwnProperty(key) && objeto[key].toString().includes(input_text) ) {
          return true;
        }
      }
      return false;
    },
    get_preinscritos : function() {
      axios.post(getApiURL()+ '/estudiante/get_preinscritos')
      .then(response => {
        this.preinscritos = response.data.data;
      })
      .catch(error => {
        alert("Ha ocurrido un error")
        //console.log(error);
      });
    },
    get_estudiante : function(estudiante = null){
      this.cancel();
      if(estudiante.cedula != ''){
        this.filtro = estudiante.cedula
      }
      this.preinscrito = estudiante;
      this.preinscrito_selected = true;
    },
    register_trayecto : function(){

      Swal.fire({
        width: 550,
        title: 'Confirmación',
        icon: 'info',
        html: '¿Esta seguro de registrar?',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return axios.put(getApiURL() +'/trayecto/add', {
            trayecto : this.trayecto_aca
          })
          .then(response => {

            if(response.status != '200') {
              throw new Error(response.statusText)
            }
            return response.data.data;
          })
         .catch(error => {

           if(error.response.data.error.status_code == '422'){
             Swal.showValidationMessage(
               `Llene los campos.`
             )
           }else{
             Swal.showValidationMessage(
               `Request fail: ${error}`
             )
           }
         });
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then(result => {
        if(result.value){
          Swal.fire({
            width: 650,
            icon: 'success',
            title: 'Registro realizado.'
          })
          this.get_trayectos();
          this.trayecto_aca = {};
          this.deploy_form = false
        }
      })
    },
    update_trayecto : function(){

      Swal.fire({
        width: 600,
        title: 'Confirmación',
        icon: 'info',
        html: '¿Esta seguro de modificar este trayecto academico?',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return axios.put(getApiURL() +'/trayecto/update', {
            trayecto : this.trayecto_aca
          })
          .then(response => {

            if(response.status != '200') {
              throw new Error(response.statusText)
            }
            return response.data.data;
          })
         .catch(error => {

           if(error.response.data.error.status_code == '422'){
             Swal.showValidationMessage(
               `Verifique que los campos esten rellenados.`
             )
           }else{
             Swal.showValidationMessage(
               `Request fail: ${error}`
             )
           }
         });
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then(result => {
          if(result.value){
            Swal.fire({
              width: 650,
              icon: 'success',
              title: 'Modificado correctamente.'
            })
            this.get_trayectos();
            this.trayecto_Aca = {};
            this.filtro = '';
            this.trayecto_selected = false;
          }
      })
    },
    delete_trayecto : function(trayecto_id){

      Swal.fire({
        width: 600,
        title: 'Confirmación',
        icon: 'warning',
        html: '¿Esta seguro de eliminar?',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return axios.post(getApiURL()+'/trayecto/delete', {
            trayecto_id : trayecto_id
          })
          .then(response => {
            if (response.status != '200') {
              throw new Error(response.statusText)
            }
            return response.data.data;
          })
         .catch(error => {
           Swal.showValidationMessage(
             `Request fail: ${error}`
           )
         });
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then(result => {
          if(result.value){
            Swal.fire({
              width: 650,
              icon: 'success',
              title: 'Eliminado con exito'
            })
            this.get_trayectos();
            this.trayecto_aca = {};
            this.trayecto_selected = false;
          }
      })
    },
    cancel : function(){
      this.trayecto_aca = {};
      this.filtro = '';
      this.trayecto_selected = false;
      this.deploy_form = false;
    }
  }
});

Vue.component('manage-trayecto',
{
  template:`
  <div :style="Styles.marginTop">
    <center>
      <h1 class="display-4">
        Administración de trayectos
      </h1>
    </center>
    <div class="card bg-light mb-3" :style="Styles.marginBottom">
      <div class="card-body">
        <div class="row">
          <div :style="Styles.marginBottom" class="col-md-8 col-sm-8 col-lg-8">
            <div class="form-inline">
              <div class="form-group">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-default">Campo de filtrado</span>
                  </div>
                  <input style="margin:0;" type="text" class="form-control" placeholder="" v-model="filtro">
                </div>
              </div>
            </div>
          </div>
          <div :style="Styles.marginBottom" class="text-md-right col-md-4 col-sm-4 col-lg-4">
            <button type="button" class="btn btn-primary" v-on:click="deploy_form = true">Añadir trayecto</button>
          </div>
        </div>
      </div>
      <div class="table-responsive">
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th>
                Carrera
              </th>
              <th>
                Trayecto
              </th>
              <th>
              </th>
            </tr>
          </thead>
          <paginate name="trayectos" :list="tablefilter" :per="5" tag="tbody">
            <tr v-if="trayectos.length == 0">
              <td :style="Styles.middleAlign" colspan="5">
                <center>
                  <h4 style="margin: 0;">
                    <label style="margin: 0;">
                      Sin registros
                    </label>
                  </h4>
                </center>
              </td>
            </tr>
            <tr v-for="trayecto in paginated('trayectos')">
              <td :style="Styles.middleAlign">
                {{ trayecto.carrera }}
              </td>
              <td :style="Styles.middleAlign">
                {{ trayecto.trayecto }}
              </td>
              <td class="text-right">
                <button type="button" class="btn btn-primary btn-sm" @click="get_trayecto(trayecto)"><strong>Modificar</strong></button>
                <button type="button" class="btn btn-danger btn-sm" @click="delete_trayecto(trayecto.id)"><strong>Eliminar</strong></button>
              </td>
            </tr>
          </paginate>
        </table>
        <paginate-links for="trayectos" :limit="5" :show-step-links="true" :classes="{'ul': 'pagination', 'li': 'page-item', 'a': 'page-link'}"></paginate-links>
      </div>
    </div>
    <center>
      <h1 class="display-4">
        Datos del trayecto
      </h1>
    </center>
    <div class="row">
      <div class="col-md-12 col-sm-12 col-lg-12">
        <div class="card bg-light mb-3">
          <div v-if="trayecto_selected == false && deploy_form == false" class="card-body">
            <div class="row">
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 mb-12">
                <center>
                  <h1 v-if="trayectos.length != 0">
                    <small class="text-muted">Pulse <span class="badge badge-primary">Modificar</span> en el trayecto academico para ver los campos</small>
                  </h1>
                  <h1 v-else>
                    <small class="text-muted">Pulse <span class="badge badge-primary">Añadir trayecto</span> para registrar un trayecto academico</small>
                  </h1>
                </center>
              </div>
            </div>
          </div>
          <div v-else class="card-body">
            <div class="form-group"> <!-- Full Name -->
                <div class="col-md-3 offset-md-1">
                    <label class="col-form-label">Trayecto</label>
                </div>
            </div>
            <div class="form-group">
                <div class="col-md-6 offset-md-1 input-group">
                    <input v-model="trayecto_aca.trayecto" type="text" class="form-control" id="trayecto" name="trayecto" placeholder="Ingrese el trayecto">
                </div>
                <div class="col-md-12 offset-md-1 input-group">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" @click="trayecto_aca.ti? trayecto_aca.ti = false: trayecto_aca.ti = true" :checked="trayecto_aca.ti? true:false" id="defaultCheck1">
                    <label class="form-check-label" for="defaultCheck1">
                      Trayecto inicial/Introductorio
                    </label>
                  </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-md-6 offset-md-1">
                    <label class="col-form-label">Carreras a asignarle este trayecto:</label>
                </div>
            </div>
            <div class="form-group">
                <div class="col-md-6 offset-md-1 input-group">
                    <select v-model="trayecto_aca.id_carrera" required v-bind:multiple="trayecto_selected? false:true" class="form-control" id="carreras" name="carreras">
                      <option v-for="carrera in carreras" v-bind:value="carrera.id">{{ carrera.carrera }}</option>
                    </select>
                </div>
            </div>
            <div class="row">
              <div class="col-md-4">
              </div>
              <div class="col-md-4">
                <center>
                  <button v-if="deploy_form" type="submit" class="btn btn-success" @click="register_trayecto()">Registrar</button>
                  <button v-else type="submit" class="btn btn-success" @click="update_trayecto()">Actualizar</button>
                </center>
              </div>
              <div class="col-md-4">
                <button type="submit" class="btn btn-danger offset-md-9" @click="cancel()">Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `,
  props : ['carreras'],
  data() {
    return {
      Styles : {
        middleAlign : {
          'vertical-align': 'middle'
        },
        marginBottom : {
          'margin-bottom' : '15px'
        },
        marginTop : {
          'margin-top' : '15px'
        },
        scrollX : {
          'overflow-x' : 'auto',
          'white-space' : 'nowrap'
        }
      },
      filtro : '',
      trayecto_aca : {
        trayecto : '',
        ti : false,
        id_carrera : []
      },
      deploy_form : false,
      trayectos : [],
      paginate : ['trayectos'],
      filtro : '',
      trayecto_selected : false
    }
  },
  computed: {
    tablefilter: function(){
      return this.trayectos.filter(trayecto  => {
        return this.buscarEnObjeto(trayecto, this.filtro);
      });
    }
  },
  created(){
    this.get_trayectos()
  },
  methods:{
    buscarEnObjeto(objeto, input_text){
      for (let key in objeto){
        if (objeto.hasOwnProperty(key) && objeto[key].toString().includes(input_text) ) {
          return true;
        }
      }
      return false;
    },
    get_trayectos : function() {
      axios.post(getApiURL()+ '/trayecto/get')
      .then(response => {
        this.trayectos = response.data.data;
      })
      .catch(error => {
        alert("Ha ocurrido un error")
        //console.log(error);
      });
    },
    get_trayecto : function(trayecto = null){
      this.cancel();
      if(trayecto.carrera != ''){
        this.filtro = trayecto.carrera
      }
      this.trayecto_aca.id = trayecto.id;
      this.trayecto_aca.trayecto = trayecto.trayecto;
      this.trayecto_aca.ti = trayecto.ti;
      this.trayecto_aca.id_carrera = trayecto.id_carrera;
      this.trayecto_selected = true;
    },
    register_trayecto : function(){

      Swal.fire({
        width: 550,
        title: 'Confirmación',
        icon: 'info',
        html: '¿Esta seguro de registrar?',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return axios.put(getApiURL() +'/trayecto/add', {
            trayecto : this.trayecto_aca
          })
          .then(response => {

            if(response.status != '200') {
              throw new Error(response.statusText)
            }
            return response.data.data;
          })
         .catch(error => {

           if(error.response.data.error.status_code == '422'){
             Swal.showValidationMessage(
               `Llene los campos.`
             )
           }else{
             Swal.showValidationMessage(
               `Request fail: ${error}`
             )
           }
         });
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then(result => {
        if(result.value){
          Swal.fire({
            width: 650,
            icon: 'success',
            title: 'Registro realizado.'
          })
          this.get_trayectos();
          this.trayecto_aca = {};
          this.deploy_form = false
        }
      })
    },
    update_trayecto : function(){

      Swal.fire({
        width: 600,
        title: 'Confirmación',
        icon: 'info',
        html: '¿Esta seguro de modificar este trayecto academico?',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return axios.put(getApiURL() +'/trayecto/update', {
            trayecto : this.trayecto_aca
          })
          .then(response => {

            if(response.status != '200') {
              throw new Error(response.statusText)
            }
            return response.data.data;
          })
         .catch(error => {

           if(error.response.data.error.status_code == '422'){
             Swal.showValidationMessage(
               `Verifique que los campos esten rellenados.`
             )
           }else{
             Swal.showValidationMessage(
               `Request fail: ${error}`
             )
           }
         });
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then(result => {
          if(result.value){
            Swal.fire({
              width: 650,
              icon: 'success',
              title: 'Modificado correctamente.'
            })
            this.get_trayectos();
            this.trayecto_Aca = {};
            this.filtro = '';
            this.trayecto_selected = false;
          }
      })
    },
    delete_trayecto : function(trayecto_id){

      Swal.fire({
        width: 600,
        title: 'Confirmación',
        icon: 'warning',
        html: '¿Esta seguro de eliminar?',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return axios.post(getApiURL()+'/trayecto/delete', {
            trayecto_id : trayecto_id
          })
          .then(response => {
            if (response.status != '200') {
              throw new Error(response.statusText)
            }
            return response.data.data;
          })
         .catch(error => {
           Swal.showValidationMessage(
             `Request fail: ${error}`
           )
         });
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then(result => {
          if(result.value){
            Swal.fire({
              width: 650,
              icon: 'success',
              title: 'Eliminado con exito'
            })
            this.get_trayectos();
            this.trayecto_aca = {};
            this.trayecto_selected = false;
          }
      })
    },
    cancel : function(){
      this.trayecto_aca = {};
      this.filtro = '';
      this.trayecto_selected = false;
      this.deploy_form = false;
    }
  }
});

Vue.component('manage-user',
{
  template:`
  <div :style="Styles.marginTop">
    <center>
      <h1 class="display-4">
        Administración de cuentas de usuario
      </h1>
    </center>
    <div class="card bg-light mb-3" :style="Styles.marginBottom">
      <div class="card-body">
        <div class="row">
          <div :style="Styles.marginBottom" class="col-md-8 col-sm-8 col-lg-8">
            <div class="form-inline">
              <div class="form-group">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-default">Campo de filtrado</span>
                  </div>
                  <input style="margin:0;" type="text" class="form-control" placeholder="" v-on:keyup="get_user_filter()" v-model="filtro">
                </div>
              </div>
              &nbsp;&nbsp;
              <button type="button" class="btn btn-primary" @click="get_user()">Consultar usuario</button>
            </div>
          </div>
          <div :style="Styles.marginBottom" class="text-md-right col-md-4 col-sm-4 col-lg-4">
            <button type="button" class="btn btn-primary" v-on:click="deploy_form = true">Añadir usuario</button>
          </div>
        </div>
      </div>
      <div class="table-responsive">
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th>
                Usuario
              </th>
              <th>
                Nombre del usuario
              </th>
              <th>
                Estatus
              </th>
              <th>
              </th>
            </tr>
          </thead>
          <paginate name="accounts" :list="accounts" :per="5" tag="tbody">
            <tr v-if="accounts.length == 0">
              <td :style="Styles.middleAlign" colspan="5">
                <center>
                  <h4 style="margin: 0;">
                    <label style="margin: 0;">
                      Sin registros
                    </label>
                  </h4>
                </center>
              </td>
            </tr>
            <tr v-for="account in paginated('accounts')">
              <td :style="Styles.middleAlign">
                {{ account.user_name }}
              </td>
              <td :style="Styles.middleAlign">
                {{ account.name+' '+account.last_name }}
              </td>
              <td :style="Styles.middleAlign">
                <span v-if="account.status == 'A'" class="badge badge-pill badge-primary">Activo</span>
                <span v-else-if="account.status == 'P'" class="badge badge-pill badge-warning">Pendiente</span>
                <span v-else-if="account.status == 'U'" class="badge badge-pill badge-light">Upgrade sin verificar</span>
                <span v-else class="badge badge-pill badge-danger">Insolvente</span>
              </td>
              <td class="text-center">
                <button type="button" class="btn btn-primary btn-sm" @click="get_user(account.user_name)"><strong>Modificar</strong></button>
                <button type="button" class="btn btn-danger btn-sm" @click="delete_user(account.id)"><strong>Eliminar</strong></button>
              </td>
            </tr>
          </paginate>
        </table>
        <paginate-links for="accounts" :limit="5" :show-step-links="true" :classes="{'ul': 'pagination', 'li': 'page-item', 'a': 'page-link'}"></paginate-links>
      </div>
    </div>
    <center>
      <h1 class="display-4">
        Datos del usuario
      </h1>
    </center>
    <div class="row">
      <div class="col-md-12 col-sm-12 col-lg-12">
        <div class="card bg-light mb-3">
          <div v-if="!user_selected && deploy_form == false" class="card-body">
            <div class="row">
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 mb-12">
                <center>
                  <h1 v-if="accounts.length != 0">
                    <small class="text-muted">Pulse <span class="badge badge-primary">Modificar</span> en el usuario para ver los campos</small>
                  </h1>
                  <h1 v-else>
                    <small class="text-muted">Pulse <span class="badge badge-primary">Añadir usuario</span> para registrar un usuario nuevo</small>
                  </h1>
                </center>
              </div>
            </div>
          </div>
          <div v-else class="card-body">
            <div class="row">
              <label for="email" class="col-md-12 col-form-label">Tipo de usuario</label>
              <div class="col-md-8 mb-3">
                <div class="row">
                  <div class="col-md-3 text-md-center">
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="E" v-model="user_type">
                      <label class="form-check-label" for="inlineRadio1">Estudiante</label>
                    </div>
                  </div>
                  <div class="col-md-3 text-md-center">
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="P" v-model="user_type">
                      <label class="form-check-label" for="inlineRadio2">Profesor</label>
                    </div>
                  </div>
                  <div class="col-md-3 text-md-center">
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="CE" v-model="user_type">
                      <label class="form-check-label" for="inlineRadio3">Control estudio</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="row">
                  <div class="col-md-4 mb-3">
                    <label for="inlineFormCustomSelect">Tipo</label></h6>
                    <select class="custom-select mr-sm-2"  v-model="user.type_document" required>
                      <option value="CC">CC</option>
                      <option value="Pasaporte">Pasaporte</option>
                      <option value="CE">CE</option>
                      <option value="NIT">NIT</option>
                    </select>
                  </div>
                  <div class="col-md-6">
                    <h6><label>Cedula</label></h6>
                    <input type="number" class="form-control" v-model="user.dni" placeholder="" required>
                  </div>
                </div>
              </div>
              <div v-if="user_type == 'P'" class="col-md-6">
                <h6><label>Coordinación perteneciente:</label></h6>
                <select class="custom-select mr-sm-2" v-model="user.gener" required>
                  <option value="M">Hombre</option>
                  <option value="F">Mujer</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
              <div v-else-if="user_type == 'CE'" class="col-md-6 mb-3">
                <div class="col-md-6">
                  <h6><label>Privilegio::</label></h6>
                  <select class="custom-select mr-sm-2" v-model="user.gener" required>
                    <option value="M">Usuario comun</option>
                    <option value="F">Administrador</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mb-3">
                <h6><label>Primer nombre</label></h6>
                <input type="text" class="form-control" v-model="user.name"  placeholder="" required>
              </div>
              <div class="col-md-6 mb-3">
                <h6><label>Segundo nombre</label></h6>
                <input type="text" class="form-control" v-model="user.last_name" placeholder="" required>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mb-3">
                <h6><label>Primer apellido</label></h6>
                <input type="text" class="form-control" v-model="user.name"  placeholder="" required>
              </div>
              <div class="col-md-6 mb-3">
                <h6><label>Segundo apellido</label></h6>
                <input type="text" class="form-control" v-model="user.last_name" placeholder="" required>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mb-3">
                <h6><label>Usuario</label></h6>
                <input type="text" class="form-control" v-model="user.user_name" placeholder="" required>
              </div>
              <div class="col-md-6 mb-3">
                <h6><label>Correo</label></h6>
                <input type="email" class="form-control" v-model="user.email" placeholder="" required>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mb-3">
                <h6><label>Numero de Telefono Celular</label></h6>
                <input type="number" class="form-control" v-model="user.phone" placeholder="" required>
              </div>
              <div class="col-md-6 mb-3">
                <h6><label for="inlineFormCustomSelect">Genero</label></h6>
                <select class="custom-select mr-sm-2" v-model="user.gener" required>
                  <option value="M">Hombre</option>
                  <option value="F">Mujer</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mb-3">
                <h6><label>Fecha de nacimiento</label></h6>
                <input type="date" class="form-control" v-model="user.birthdate" placeholder="">
              </div>
              <div class="col-md-6">
                <h6><label>Direccion</label></h6>
                <input type="text" class="form-control" v-model="user.direction" placeholder="">
              </div>
            </div>
            <div class="row">
              <div class="col-md-4">
              </div>
              <div class="col-md-4">
                <center>
                  <button type="submit" class="btn btn-success" @click="update_user()">Actualizar</button>
                </center>
              </div>
              <div class="col-md-4">
                <button type="submit" class="btn btn-danger offset-md-9" @click="cancel()">Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `,
  data() {
    return {
      Styles : {
        middleAlign : {
          'vertical-align': 'middle'
        },
        marginBottom : {
          'margin-bottom' : '15px'
        },
        marginTop : {
          'margin-top' : '15px'
        },
        scrollX : {
          'overflow-x' : 'auto',
          'white-space' : 'nowrap'
        }
      },
      filtro : '',
      user : {
        name : '',
        last_name : ''
      },
      deploy_form : false,
      user_type : '',
      accounts : [],
      paginate : ['accounts'],
      filtro : '',
      referer_key : '',
      user_selected : false
    }
  },
  computed: {
    tablefilter: function(){
      return this.accounts.filter(account  => {
        return this.buscarEnObjeto(account, this.filtro);
      });
    }
  },
  created(){
    this.get_user_accounts()
  },
  methods:{
    buscarEnObjeto(objeto, input_text){
      for (let key in objeto){
        if (objeto.hasOwnProperty(key) && objeto[key].toString().includes(input_text) ) {
          return true;
        }
      }
      return false;
    },
    get_user_accounts : function() {
      axios.get(getApiURL()+ '/get_user_accounts')
      .then(response => {
        this.accounts = response.data.data;
        ////console.log(response.data.data);
      })
      .catch(error => {
        alert("Ha ocurrido un error")
        //console.log(error);
      });
    },
    get_user_filter : function() {
      axios.post(getApiURL()+ '/get_user_accounts_filter',{
        filter : this.filtro
      })
      .then(response => {
        this.accounts = response.data.data;
        ////console.log(response.data.data);
      })
      .catch(error => {
        alert("Ha ocurrido un error")
        //console.log(error);
      });
    },
    get_user : function(user_name = null){
      this.cancel();
      if(user_name != null){
        this.filtro = user_name
      }

      Swal.showLoading();

      axios.post(getApiURL()+'/get_user',{
        user : this.filtro
      })
      .then(response => {
        this.user = response.data.data;
        this.user_selected = true;
        Swal.close();
        //console.log(response.data.data);
      })
      .catch(error => {
        //alert("Ha ocurrido un error")
        Swal.close();
        //console.log(error);
      })
      .finally(() => {
        data.component_location_selects.selected_country = this.user.country_id
        data.component_location_selects.getState('triggered')
        data.component_location_selects.selected_state = this.user.state_id
        this.referer_key = getApiURL()+'/register/'+this.user.referer_key
      });
    },
    update_user : function(){

      Swal.fire({
        width: 600,
        title: 'Confirmación',
        icon: 'info',
        html: '¿Esta seguro de modificar datos de este usuario?',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return axios.put(getApiURL() +'/update_profile_admin', {
            user : this.user,
            state_id : data.component_location_selects.state
          })
          .then(response => {

            if(response.status != '200') {
              throw new Error(response.statusText)
            }
            return response.data.data;
          })
         .catch(error => {

           if(error.response.data.error.status_code == '422'){
             Swal.showValidationMessage(
               `Verifique que todos los campos esten rellenados.`
             )
           }else{
             Swal.showValidationMessage(
               `Request fail: ${error}`
             )
           }
         });
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then(result => {
          if(result.value){
            Swal.fire({
              width: 650,
              icon: 'success',
              title: 'Modificado correctamente.'
            })
            this.get_user_accounts();
            this.user = {};
            this.referer_key = '';
            this.user_selected = false
          }
      })
    },
    delete_user : function(user_id){

      Swal.fire({
        width: 600,
        title: 'Confirmación',
        icon: 'warning',
        html: '¿Esta seguro de realizar la eliminación?',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return axios.post(getApiURL()+'/user/delete', {
            user_id : user_id
          })
          .then(response => {
            if (response.status != '200') {
              throw new Error(response.statusText)
            }
            return response.data.data;
          })
         .catch(error => {
           Swal.showValidationMessage(
             `Request fail: ${error}`
           )
         });
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then(result => {
          if(result.value){
            Swal.fire({
              width: 650,
              icon: 'success',
              title: 'Eliminado con exito.'
            })
            this.get_user_accounts();
            this.user = {};
            this.referer_key = ''
            this.user_selected = false
          }
      })
    },
    cancel : function(){
      this.user = {};
      this.referer_key = ''
      this.user_selected = false
    }
  }
});

Vue.component('global-network',
{
  template:`
    <div class="row">
      <div class="col-sm-12 col-md-12">
        <center>
          <h3 style="margin-top: 15px;">
            <label>
              Red de usuarios
            </label>
          </h3>
        </center>
      </div>
      <div class="col-sm-12 col-md-12">
        <div class="row">
          <div class="container col-sm-12 col-md-12">
            <div class="card">
              <div style="padding: 3px;" class="card-body">
                <svg class="col-sm-12 col-md-12" style="padding: 0; height: 500px;" id="SVGFrame2" viewBox="0 0 600 900" version="1.1">
                  <g id="Gtree">
                    <g class="links"></g>
                    <g class="nodes"></g>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
 `,
 props:['user'],
 data() {
    return {
      Style : {
        stretch_padding : {
          padding : '8px 0px 8px 0px'
        },
        null_margin : {
          margin : '0px'
        },
        cellborders : {
          'border-left' : '2px solid black',
          'border-right': '2px solid black'
        },
        borderBottom : {
          'border-bottom': '2px solid black'
        },
        borderTop : {
          'border-top': '2px solid black'
        }
      },
      directs : '',
      tree_layout : '',
      tree_mode: true,
      cycle_closed : '',
      referrals : '',
      level : 2,
      data_user : this.user
    }
  },
  created(){
    //console.log(this.user)
    this.get_entire_directs();
  },
  methods:{
    get_entire_directs: function(){

      axios.get(getApiURL()+'/get_entire_directs')
       .then(response => {
         this.tree_layout = response.data.data;
       })
       .catch(error => {
        alert("Ha ocurrido un error")
        //console.log(error);
      }).finally(() => {
        this.constructGraphicTree(this.tree_layout)
      });
    },
    constructGraphicTree : function(tree_layout){

      var root = d3.hierarchy(tree_layout)
      var treeWidth = 0;
      var gtreeWidth = 0;
      var treeHeight = 0;

      treeWidth = 2600;
      gtreeWidth = (root.x/2)+(root.x*0.1);
      treeHeight = 750;

      var treeLayout = d3.tree()
                          .size([treeWidth, treeHeight])

      treeLayout(root)

      gtreeWidth = (root.x/2)+(root.x*0.3);

      d3.select('svg g#Gtree')
        .attr("transform", "matrix(1,0,0,1,-"+gtreeWidth+",60)")

      window.zoomTiger = svgPanZoom('#SVGFrame2',{
        zoomEnabled: true,
        controlIconsEnabled: true,
        fit: true,
        center: true,
      });

      var img = 'https://img2.freepng.es/20180331/eow/kisspng-computer-icons-user-clip-art-user-5abf13db298934.2968784715224718991702.jpg';

      // Nodes
      var nodes = d3.select('svg g.nodes')
        .selectAll('g.node')
        .data(root.descendants())
        .enter()
        .append('g')
        .attr("class", "node")
        .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })

        nodes.append("defs")
           .attr("id", "imgdefs")
           .append("pattern")
           .attr("id", function(d){ return 'img'+d.data.id})
           .attr("height", 1)
           .attr("width", 1)
           .attr("x", "0")
           .attr("y", "0")
           .append("image")
           .attr('x', -20)
           .attr('y', -20)
           .attr("height", '100')
           .attr("width", '100')
           .attr("xlink:href", img)

      var images = nodes.append("svg:circle")
         .attr("r", 30)
         .attr("stroke", 'steelblue')
         .attr("stroke-width", 2)
         .attr("fill", function(d){ return "url(#img"+d.data.id+")"; });

      //Seteamos los eventos
      images.on('mouseenter', function(d){
        if(d.parent != null){
          //console.log(d3.select(this).parent);
          d3.select("pattern#img"+d.data.id).select("image")
            .transition()
            .attr("width","110").attr("height","110");
            // select element in current context
          d3.select( this )
            .transition()
            .attr("r", "35")
            //.attr("height", 100)
            //.attr("width", 100);
        }
      })
      .on( 'mouseleave', function(d){
        if(d.parent != null){
          d3.select("pattern#img"+d.data.id).select("image")
            .transition()
            .attr("width","100")
            .attr("height","100");

          d3.select( this )
            .transition()
            .attr("r", "30")
            //.attr("height", 50)
            //.attr("width", 50);
        }
      })
      .on('click', function(d){
        if(d.parent != null){
          data.component_direct_modal.direct = d.data
          data.component_direct_modal.get_direct_referrals()
          $("#ModalCenter").modal("show");
        }
      });

      var label_width = 75;
      var label_height = 20;
      var bbox = images.node().getBBox();
      // Labels
      nodes.append('rect')
        .classed('label', true)
        .attr("width", label_width)
        .attr("height", label_height)
        .attr('x', function(d) {return bbox.x - (bbox.width*0.11);})
        .attr('y', function(d) {return (bbox.height * 0.85) + bbox.y})
        .attr("rx", '7')

      var bbox2 = nodes.node().getBBox();
      nodes.append('text')
      .attr("stroke", "#fff")
      .attr("text-anchor", 'middle')
      .attr('x', function(d) {return bbox2.x + (bbox2.width*0.5);})
      .attr('y', function(d) {return bbox.y + (bbox.height+5);})
      .attr('dy', ".10em")
      .text(function(d, i){
        return d.data.user_name;
      });

      nodes.append('rect')
        .classed('label', true)
        .attr("width", label_width/3.5)
        .attr("height", label_height)
        .attr('x', function(d) {return bbox.x + (bbox.width*0.68);})
        .attr('y', function(d) {return bbox.y*1.3})
        .attr("rx", '7')

      nodes.append('text')
        .attr("stroke", "#fff")
        .attr("text-anchor", 'middle')
        .attr('x', function(d) {return bbox2.x + (bbox2.width*0.77);})
        .attr('y', function(d) {return bbox.y*0.8;})
        .text(function(d){
          return d.data.level_id;
        });

      // Links
      d3.select('svg g.links')
        .selectAll('line.link')
        .data(root.links())
        .enter()
        .append('line')
        .classed('link', true)
        .attr('x1', function(d) {return d.source.x;})
        .attr('y1', function(d) {return d.source.y;})
        .attr('x2', function(d) {return d.target.x;})
        .attr('y2', function(d) {return d.target.y;});
    }
  }
});

Vue.component('benefits-stats',
{
  template:`
  <div>
    <div class="row">
      <div class="col-sm-12 col-md-12">
        <div class="card text-white" style="background:#3f4052;">
          <div class="card-body">
            <h4>
              <label>
                Fecha de pago de membresia
              </label>
            </h4>
            <h3>
              <label>
                <strong>
                  {{ monthly_payment }}
                </strong>
              </label>
            </h3>
            <label>
              - El costo de la membresia es de 10.000 EDC.<br>
              - Se le sera descontado automaticamente de su saldo interno disponible.
            </label>
          </div>
        </div>
      </div>
    </div>
    <div :style="Styles.marginTop" class="row">
      <div class="col-md-12 col-sm-12 col-lg-12">
        <center>
          <h3 style="margin-top: 0px;">
            <label>
              Ingresos generados por membresias de sus directos
            </label>
          </h3>
        </center>
        <div class="card text-white" style="background:#3f4052;">
          <div class="card-body">
            <div class="row">
              <div class="col-md-12 col-sm-12 col-lg-12">
                <div class="row">
                  <div class="col-md-12 col-sm-12 col-lg-12">
                    <center>
                      <h4>
                        Pagos de membresias
                      </h4>
                    </center>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6 col-sm-6 col-lg-6">
                    <div class="row">
                      <div class="col-md-12 col-sm-12 col-lg-12">
                        <center>
                          <h4>
                            <label style="margin:0;">
                              Directos
                            </label>
                          </h4>
                        </center>
                        <div class="row">
                          <div class="col-md-12 col-sm-12 col-lg-12">
                            <center>
                              <h4>
                                <label>
                                  {{ membership_incomes.directs }}
                                </label>
                              </h4>
                            </center>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6 col-sm-6 col-lg-6">
                    <div class="row">
                      <div class="col-md-12 col-sm-12 col-lg-12">
                        <div class="row">
                          <div class="col-md-12 col-sm-12 col-lg-12">
                            <center>
                              <h4>
                                <label style="margin:0;">
                                  Monto total
                                </label>
                              </h4>
                            </center>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-12 col-sm-12 col-lg-12">
                            <center>
                              <h4>
                                <label>
                                  {{ membership_incomes.earnings.toLocaleString('de-DE') }} EDC
                                </label>
                              </h4>
                            </center>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`,
  props: ['membership_date'],
  data() {
    return {
      Styles : {
        middleAlign : {
          'vertical-align': 'middle'
        },
        marginTop : {
          'margin-top' : '15px'
        },
        marginBottom : {
          'margin-bottom' : '15px'
        },
        scrollX : {
          'overflow-x' : 'auto',
          'white-space' : 'nowrap'
        }
      },
      monthly_payment : this.membership_date,
      membership_incomes : {}
    }
  },
  created(){
    this.format_date();
    this.get_membership_incomes();
  },
  methods:{
    format_date : function() {
      moment.locale('es');
      let date = moment(this.monthly_payment);
      this.monthly_payment = date.format('LL');
    },
    get_membership_incomes : function() {
      axios.get(getApiURL()+'/get_membership_incomes')
      .then(response => {
        this.membership_incomes = response.data.data;
        ////console.log(response.data.data);
      })
      .catch(error => {
        alert("Ha ocurrido un error")
        //console.log(error);
      });
    }
  }
});

Vue.component('accounting',
{
  template:`
  <div :style="Styles.marginTop" class="row">
    <div class="col-md-6 col-sm-6 col-lg-6">
      <center>
        <h3 style="margin-top: 0px;">
          <label>
            Ingresos
          </label>
        </h3>
      </center>
      <div class="card text-white" style="background:#3f4052;">
        <div class="card-body">
          <div class="row">
            <div class="col-md-12 col-sm-12 col-lg-12">
              <h3>
                Ingresos totales
                <br>
                <label :style="Styles.marginTop">
                  {{ incomes.total_incomes?.toLocaleString('De-de') }} EDC
                </label>
              </h3>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 col-sm-12 col-lg-12">
              <center>
                <h4>
                  <label style="margin: 0;">
                    Desglose
                  </label>
                </h4>
              </center>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 col-sm-12 col-lg-12">
              <div :style="[{'background' : '#3f4052'}, Styles.marginBottom]" class="card">
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-12 col-sm-12 col-lg-12">
                      <center>
                        <h4>
                          Compra de niveles
                        </h4>
                      </center>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12 col-sm-12 col-lg-12">
                      <center>
                        {{ ((incomes.upgrades?.external.unique + incomes.upgrades?.external.multiple) + (incomes.upgrades?.internal.unique + incomes.upgrades?.internal.multiple)).toLocaleString('De-de') }} EDC
                      </center>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6 col-sm-6 col-lg-6">
                      <div class="row">
                        <div class="col-md-12 col-sm-12 col-lg-12">
                          <div class="row">
                            <div class="col-md-12 col-sm-12 col-lg-12">
                              <center>
                                <h4>
                                  <label style="margin:0;">
                                    Pago interno
                                  </label>
                                </h4>
                              </center>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-md-12 col-sm-12 col-lg-12">
                              <center>
                                {{ (incomes.upgrades?.internal.unique + incomes.upgrades?.internal.multiple).toLocaleString('De-de') }} EDC
                              </center>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-6 col-sm-6 col-lg-6">
                          <div class="row">
                            <div class="col-md-12 col-sm-12 col-lg-12">
                              <center>
                                <h5>
                                  <label style="margin:0;">
                                    Unico
                                  </label>
                                </h5>
                              </center>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-md-12 col-sm-12 col-lg-12">
                              <center>
                                {{ incomes.upgrades?.internal.unique.toLocaleString('De-de') }} EDC
                              </center>
                            </div>
                          </div>
                        </div>
                        <div class="col-md-6 col-sm-6 col-lg-6">
                          <div class="row">
                            <div class="col-md-12 col-sm-12 col-lg-12">
                              <center>
                                <h5>
                                  <label style="margin:0;">
                                    Multiple
                                  </label>
                                </h5>
                              </center>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-md-12 col-sm-12 col-lg-12">
                              <center>
                                {{ incomes.upgrades?.internal.multiple.toLocaleString('De-de') }} EDC
                              </center>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6 col-sm-6 col-lg-6">
                      <div class="row">
                        <div class="col-md-12 col-sm-12 col-lg-12">
                          <div class="row">
                            <div class="col-md-12 col-sm-12 col-lg-12">
                              <center>
                                <h4>
                                  <label style="margin:0;">
                                    Pago externo
                                  </label>
                                </h4>
                              </center>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-md-12 col-sm-12 col-lg-12">
                              <center>
                                {{ (incomes.upgrades?.external.unique + incomes.upgrades?.external.multiple).toLocaleString('De-de') }} EDC
                              </center>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-6 col-sm-6 col-lg-6">
                          <div class="row">
                            <div class="col-md-12 col-sm-12 col-lg-12">
                              <center>
                                <h5>
                                  <label style="margin:0;">
                                    Unico
                                  </label>
                                </h5>
                              </center>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-md-12 col-sm-12 col-lg-12">
                              <center>
                                {{ incomes.upgrades?.external.unique.toLocaleString('De-de') }} EDC
                              </center>
                            </div>
                          </div>
                        </div>
                        <div class="col-md-6 col-sm-6 col-lg-6">
                          <div class="row">
                            <div class="col-md-12 col-sm-12 col-lg-12">
                              <center>
                                <h5>
                                  <label style="margin:0;">
                                    Multiple
                                  </label>
                                </h5>
                              </center>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-md-12 col-sm-12 col-lg-12">
                              <center>
                                {{ incomes.upgrades?.external.multiple.toLocaleString('De-de') }} EDC
                              </center>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 col-sm-12 col-lg-12">
              <div :style="[{'background' : '#3f4052'}, Styles.marginBottom]" class="card">
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-12 col-sm-12 col-lg-12">
                      <center>
                        <h4>
                          Activaciones de nuevos usuarios
                        </h4>
                      </center>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6 col-sm-6 col-lg-6">
                      <div class="row">
                        <div class="col-md-12 col-sm-12 col-lg-12">
                          <div class="row">
                            <div class="col-md-12 col-sm-12 col-lg-12">
                              <center>
                                <h4>
                                  <label style="margin:0;">
                                    Activaciones
                                  </label>
                                </h4>
                              </center>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-md-12 col-sm-12 col-lg-12">
                              <center>
                                {{ incomes.activated_users?.cantidad.toLocaleString('De-de') }}
                              </center>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6 col-sm-6 col-lg-6">
                      <div class="row">
                        <div class="col-md-12 col-sm-12 col-lg-12">
                          <div class="row">
                            <div class="col-md-12 col-sm-12 col-lg-12">
                              <center>
                                <h4>
                                  <label style="margin:0;">
                                    Monto
                                  </label>
                                </h4>
                              </center>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-md-12 col-sm-12 col-lg-12">
                              <center>
                                {{ incomes.activated_users?.monto_total.toLocaleString('De-de') }}
                              </center>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 col-sm-12 col-lg-12">
              <div :style="[{'background' : '#3f4052'}, Styles.marginBottom]" class="card">
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-12 col-sm-12 col-lg-12">
                      <center>
                        <h4>
                          Pagos de membresias
                        </h4>
                      </center>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6 col-sm-6 col-lg-6">
                      <div class="row">
                        <div class="col-md-12 col-sm-12 col-lg-12">
                          <div class="row">
                            <div class="col-md-12 col-sm-12 col-lg-12">
                              <center>
                                <h4>
                                  <label style="margin:0;">
                                    Pagos
                                  </label>
                                </h4>
                              </center>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-md-12 col-sm-12 col-lg-12">
                              <center>
                                {{ incomes.memberships?.cantidad.toLocaleString('De-de') }}
                              </center>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6 col-sm-6 col-lg-6">
                      <div class="row">
                        <div class="col-md-12 col-sm-12 col-lg-12">
                          <div class="row">
                            <div class="col-md-12 col-sm-12 col-lg-12">
                              <center>
                                <h4>
                                  <label style="margin:0;">
                                    Monto
                                  </label>
                                </h4>
                              </center>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-md-12 col-sm-12 col-lg-12">
                              <center>
                                {{ incomes.memberships?.monto_total.toLocaleString('De-de') }} EDC
                              </center>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-6 col-sm-6 col-lg-6">
      <center>
        <h3 style="margin-top: 0px;">
          <label>
            Egresos
          </label>
        </h3>
      </center>
      <div class="card text-white" style="background:#3f4052;">
        <div class="card-body">
          <div class="row">
            <div class="col-md-12 col-sm-12 col-lg-12">
              <h3>
                Egresos totales
                <br>
                <label :style="Styles.marginTop">
                  {{ expenses.total_expenses?.toLocaleString('De-de') }} EDC
                </label>
              </h3>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 col-sm-12 col-lg-12">
              <center>
                <h4>
                  <label style="margin: 0;">
                    Desglose
                  </label>
                </h4>
              </center>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 col-sm-12 col-lg-12">
              <div :style="[{'background' : '#3f4052'}, Styles.marginBottom]" class="card">
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-12 col-sm-12 col-lg-12">
                      <center>
                        <h4>
                          Bloqueo de balances
                        </h4>
                      </center>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12 col-sm-12 col-lg-12">
                      <div class="row">
                        <div class="col-md-12 col-sm-12 col-lg-12">
                          <center>
                            <h4>
                              <label style="margin:0;">
                                Bloqueado
                              </label>
                            </h4>
                          </center>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-12 col-sm-12 col-lg-12">
                          <ul style="overflow-x: auto;" class="list-group list-group-horizontal">
                            <li v-for="locked_level in expenses.lock_balances?.current.levels" class="list-group-item list-group-item-light">
                              <center>
                                <h6 class="card-title">Nv.{{ locked_level.level_id }}</h6>
                              </center>
                              <p class="card-text">{{ locked_level.lock_balance?.toLocaleString('DE-de') }}</p>
                            </li>
                          </ul>
                          <h5>
                            <label style="margin:0;">
                              <strong>
                                Total:
                              </strong>
                              {{ expenses.lock_balances?.current.total.toLocaleString('De-de') }} EDC
                            </label>
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12 col-sm-12 col-lg-12">
                      <div class="row">
                        <div class="col-md-12 col-sm-12 col-lg-12">
                          <center>
                            <h4>
                              Total desbloqueado
                            </h4>
                          </center>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-12 col-sm-12 col-lg-12">
                          <ul style="overflow-x: auto;" class="list-group list-group-horizontal">
                            <li v-for="unlocked_level in expenses.lock_balances?.unlocked.levels" class="list-group-item list-group-item-light">
                              <center>
                                <h6 class="card-title">Nv.{{ unlocked_level.id }}</h6>
                              </center>
                              <p class="card-text">{{ unlocked_level.unlocked_balance?.toLocaleString('DE-de') }}</p>
                            </li>
                          </ul>
                          <h5>
                            <label style="margin:0;">
                              <strong>
                                Total:
                              </strong>
                              {{ expenses.lock_balances?.unlocked.total.toLocaleString('De-de') }} EDC
                            </label>
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 col-sm-12 col-lg-12">
              <div :style="[{'background' : '#3f4052'}, Styles.marginBottom]" class="card">
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-12 col-sm-12 col-lg-12">
                      <center>
                        <h4>
                          Ciclos cerrados
                        </h4>
                      </center>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12 col-sm-12 col-lg-12">
                      <ul style="overflow-x: auto;" class="list-group list-group-horizontal">
                        <li v-for="level in expenses.closed_cycles?.levels" class="list-group-item list-group-item-light">
                          <center>
                            <h6 class="card-title">Nv.{{ level.id }}</h6>
                          </center>
                          <p class="card-text">{{ level.cycle_closed?.toLocaleString('DE-de') }}</p>
                        </li>
                      </ul>
                      <h5>
                        <label style="margin:0;">
                          <strong>
                            Total:
                          </strong>
                          {{ expenses.closed_cycles?.total.toLocaleString('De-de') }} EDC
                        </label>
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 col-sm-12 col-lg-12">
              <div :style="[{'background' : '#3f4052'}, Styles.marginBottom]" class="card">
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-12 col-sm-12 col-lg-12">
                      <center>
                        <h4>
                          Comisiones de membresias
                        </h4>
                      </center>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12 col-sm-12 col-lg-12">
                      <div class="row">
                        <div class="col-md-12 col-sm-12 col-lg-12">
                          <center>
                            <h4>
                              <label style="margin:0;">
                                Monto
                              </label>
                            </h4>
                          </center>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-12 col-sm-12 col-lg-12">
                          <center>
                            {{ expenses.membership_fees?.toLocaleString('De-de') }}
                          </center>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `,
  data() {
    return {
      Styles : {
        middleAlign : {
          'vertical-align': 'middle'
        },
        marginTop : {
          'margin-top' : '15px'
        },
        marginBottom : {
          'margin-bottom' : '15px'
        },
        scrollX : {
          'overflow-x' : 'auto',
          'white-space' : 'nowrap'
        }
      },
      incomes : {},
      expenses : {}
    }
  },
  created() {
    this.get_incomes();
    this.get_expenses();
  },
  methods:{
    get_incomes : function() {
      axios.get(getApiURL()+'/get_incomes')
      .then(response => {
        this.incomes = response.data.data;
        ////console.log(response.data.data);
      })
      .catch(error => {
        alert("Ha ocurrido un error")
        //console.log(error);
      });
    },
    get_expenses : function() {
      axios.get(getApiURL()+'/get_expenses')
      .then(response => {
        this.expenses = response.data.data;
        ////console.log(response.data.data);
      })
      .catch(error => {
        alert("Ha ocurrido un error")
        //console.log(error);
      });
    }
  }
});

Vue.component('withdrawals',
{
  template:`
  <div :style="Styles.marginTop" class="row">
    <div class="col-md-6 col-sm-6 col-lg-6">
      <center>
        <h3>
          <label style="margin:0;">
            Retiros pagados
            </label>
        </h3>
      </center>
      <div class="card" style="background:#3f4052;">
        <div class="table-responsive">
          <table class="table table-striped table-hover">
            <thead class="text-white">
              <tr>
                <th>
                  Usuario
                </th>
                <th>
                  Nombre
                </th>
                <th>
                  Monto
                </th>
                <th>
                  Fecha
                </th>
                <th>
                </th>
              </tr>
            </thead>
            <paginate name="withdrawals_payment" :list="withdrawals_payment" :per="5" tag="tbody">
              <tr v-if="withdrawals_payment.length == 0" class="text-white">
                <td :style="Styles.middleAlign" colspan="5">
                  <center>
                    <h4 style="margin: 0;">
                      <label style="margin: 0;">
                        Sin registros
                      </label>
                    </h4>
                  </center>
                </td>
              </tr>
              <tr class="text-white" v-for="withdrawals_payment in paginated('withdrawals_payment')">
                <td :style="Styles.middleAlign">
                  {{ withdrawals_payment.user.user_name }}
                </td>
                <td :style="Styles.middleAlign">
                  {{ withdrawals_payment.user.name+' '+withdrawals_payment.user.last_name }}
                </td>
                <td :style="Styles.middleAlign">
                  {{ withdrawals_payment.mount?.toLocaleString('de-DE') }}
                </td>
                <td :style="Styles.middleAlign">
                  {{ new Date(withdrawals_payment.created_at).toLocaleDateString('es-ES')}}
                </td>
               <!-- <td class="text-center">
                  <button type="button" class="btn btn-primary btn-sm" @click="modal_withdraw(withdrawals_payment)" data-toggle="modal" data-target="#exampleModalCenter">
                    <strong>Verificar</strong>
                  </button>
                </td>-->
              </tr>
            </paginate>
          </table>
          <paginate-links for="withdrawals_payment" :limit="5" :show-step-links="true" :classes="{'ul': 'pagination', 'li': 'page-item', 'a': 'page-link'}"></paginate-links>
        </div>
      </div>
    </div>
    <div class="col-md-6 col-sm-6 col-lg-6">
      <center>
        <h3>
          <label style="margin:0;">
            Solicitudes de retiro
          </label>
        </h3>
      </center>
      <div class="card" style="background:#3f4052;">
        <div class="table-responsive">
          <table class="table table-striped table-hover">
            <thead class="text-white">
              <tr>
                <th>
                  Usuario
                </th>
                <th>
                  Nombre
                </th>
                <th>
                  Monto
                </th>
                <th>
                  Fecha
                </th>
                <th>
                </th>
              </tr>
            </thead>
            <paginate name="withdrawals_pending" :list="withdrawals_pending" :per="5" tag="tbody">
              <tr v-if="withdrawals_pending.length == 0" class="text-white">
                <td :style="Styles.middleAlign" colspan="5">
                  <center>
                    <h4 style="margin: 0;">
                      <label style="margin: 0;">
                        Sin registros
                      </label>
                    </h4>
                  </center>
                </td>
              </tr>
              <tr class="text-white" v-for="withdrawals_pending in paginated('withdrawals_pending')">
                <td :style="Styles.middleAlign">
                  {{ withdrawals_pending.user.user_name }}
                </td>
                <td :style="Styles.middleAlign">
                  {{ withdrawals_pending.user.name+' '+withdrawals_pending.user.last_name }}
                </td>
                <td :style="Styles.middleAlign">
                  {{ withdrawals_pending.mount?.toLocaleString('de-DE') }}
                </td>
                <td :style="Styles.middleAlign">
                  {{ new Date(withdrawals_pending.created_at).toLocaleDateString('es-ES') }}
                </td>
                <td class="text-center">
                  <button type="button" class="btn btn-primary btn-sm" @click="modal_withdraw(withdrawals_pending)" data-toggle="modal" data-target="#exampleModalCenter">
                    <strong>Verificar</strong>
                  </button>
                </td>
              </tr>
            </paginate>
          </table>
          <paginate-links for="withdrawals_pending" :limit="5" :show-step-links="true" :classes="{'ul': 'pagination', 'li': 'page-item', 'a': 'page-link'}"></paginate-links>
        </div>
      </div>
    </div>
  </div>
  `,
  data() {
    return {
      Styles : {
        middleAlign : {
          'vertical-align': 'middle'
        },
        marginTop : {
          'margin-top' : '15px'
        },
        marginBottom : {
          'margin-bottom' : '15px'
        },
        scrollX : {
          'overflow-x' : 'auto',
          'white-space' : 'nowrap'
        }
      },
      user : {
        name : '',
        last_name : ''
      },
      withdrawals_pending : [],
      withdrawals_payment : [],
      paginate : ['withdrawals_pending','withdrawals_payment'],
      filtro : ''
    }
  },
  computed: {
    tablefilterPending: function(){
      return this.withdrawals_pending.filter(withdrawal  => {
        return this.buscarEnObjeto(withdrawal, this.filtro);
      });
    },
    tablefilterPayment: function(){
      return this.withdrawals_payment.filter(withdrawal  => {
        return this.buscarEnObjeto(withdrawal, this.filtro);
      });
    }
  },
  created(){
    data.component_withdrawals = this;
    this.get_withdrawal_pending();
    this.get_withdrawal_payment();
  },
  methods:{
    buscarEnObjeto(objeto, input_text){
      for (let key in objeto){
        if (objeto.hasOwnProperty(key) && objeto[key].toString().includes(input_text) ) {
          return true;
        }
      }
      return false;
    },
    get_withdrawal_pending : function() {
      axios.get(getApiURL() + '/get_withdrawal/Pendiente')
      .then(response => {
        this.withdrawals_pending = response.data.data;
        ////console.log(response.data.data);
      })
      .catch(error => {
        alert("Ha ocurrido un error")
        //console.log(error);
      });
    },
    get_withdrawal_payment : function() {
      axios.get(getApiURL() + '/get_withdrawal/Pagado')
      .then(response => {
        this.withdrawals_payment = response.data.data;
        ////console.log(response.data.data);
      })
      .catch(error => {
        alert("Ha ocurrido un error")
        //console.log(error);
      });
    },
    modal_withdraw : function(withdraw){
      data.component_withdraw_verify_modal.withdraw = withdraw;
    }
  }
});



Vue.component('link-advertising-history',
{
  template:`
  <div>
    <div class="panel">
      <div class="row">
        <div class="col-md-12 col-sm-12 col-lg-12">
          <center>
            <div class="table-responsive">
              <table class="table table-striped table-hover" >
                <thead  class="text-white">
                  <tr>
                    <th>
                      Descripción
                    </th>
                    <th>
                     Creación
                    </th>
                    <th>
                      Estatus
                    </th>
                    <th>
                      Vencimiento
                    </th>
                  </tr>
                </thead>
                <paginate name="link_advertising_history" :list="tablefilter" :per="5" tag="tbody">
                <tr class="text-white" v-if="link_advertising_history.length == 0">
                  <td :style="Styles.middleAlign" colspan="5">
                    <center>
                      <h4 style="margin: 0;">
                        <label style="margin: 0;">
                          Sin registros
                        </label>
                      </h4>
                    </center>
                  </td>
                </tr>
                  <tr  class="text-white" v-for="link_advertising in paginated('link_advertising_history')">
                   <td :style="Styles.middleAlign">
                      {{link_advertising.description}}
                    </td>
                    <td :style="Styles.middleAlign">
                      {{ new Date(link_advertising.created_at).toLocaleDateString('es-ES') }}
                    </td>
                    <td :style="Styles.middleAlign">
                      {{ link_advertising.status }}
                    </td>
                    <td :style="Styles.middleAlign">
                      {{ new Date(expiration_at).toLocaleDateString('es-ES') }}
                    </td>
                  </tr>
                </paginate>
              </table>
              <paginate-links for="link_advertising_history" :limit="5" :show-step-links="true" :classes="{'ul': 'pagination', 'li': 'page-item', 'a': 'page-link'}"></paginate-links>
            </div>
          </center>
        </div>
      </div>
    </div>
  </div>
  `,
  props:['expiration_at'],
  data() {
    return {
      Styles : {
        middleAlign : {
          'vertical-align': 'middle'
        },
        marginBottom : {
          'margin-bottom' : '15px'
        },
        scrollX : {
          'overflow-x' : 'auto',
          'white-space' : 'nowrap'
        }
      },
      link_advertising_history : [],
      paginate : ['link_advertising_history'],
      filter : ''
    }
  },
  computed: {
    tablefilter: function() {
      return this.link_advertising_history.filter(upgrade => {
        return this.buscarEnObjeto(upgrade, this.filter.toLowerCase());
      });
    }
  },
  created() {
    this.get_link_advertising_history();
    data.component_link_advertising_history = this;
  },
  methods:{
     buscarEnObjeto(objeto, input_text){

      for (let key in objeto) {
        if (objeto.hasOwnProperty(key) && objeto[key].toString().toLowerCase().includes(input_text) ) {
          return true;
        }
      }
      return false;
    },
    get_link_advertising_history : function() {
      axios.get(getApiURL()+'/get_link_advertising_history')
      .then(response => {
        this.link_advertising_history = response.data.data;
        //console.log(this.upgrades);
      })
      .catch(error => {
        alert("Ha ocurrido un error")
        //console.log(error);
      });
    }
  }
});

Vue.component('withdrawal-verify-modal',
{
  template:`
  <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalCenterTitle">Solicitud de retiro</h5>
          <button type="button" id="close_modal_withdrawal" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-6">
                <label class="col-form-label col-form-label-lg">
                  Solicitud de:
                </label>
                <h3>
                  {{ withdraw.user.user_name }}
                  <br>
                  <small class="text-muted">{{ withdraw.user.name+' '+withdraw.user.last_name }}</small>
                </h3>
              </div>
              <div class="col-md-6">
                <label class="col-form-label col-form-label-lg">
                  Solicitud realizada el:
                </label>
                <h3>
                  {{ new Date(withdraw.created_at).toLocaleDateString('es-ES')}}
                </h3>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="card">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-md-7">
                        <h4>
                          Monto retirado:
                          <br>
                          <small class="text-muted">
                            {{ withdraw.mount.toLocaleString('de-DE') }} EDC
                            <br>
                            -%5 de comision de retiro
                          </small>
                        </h4>
                      </div>
                      <div class="col-md-5">
                        <h3>
                          <span class="badge badge-info">
                            Total a pagar
                            <br>
                            <h2>
                              {{ (withdraw.mount - (withdraw.mount*0.05)).toLocaleString('de-DE') }} EDC
                            </h2>
                          </span>
                        </h3>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12">
                        <hr>
                        <center>
                          <h4>
                            Wallet de destino de pago
                            <br>
                            <span :style="[Style.marginTop, Style.marginBottom]" class="badge badge-dark">
                            {{ withdraw.user_edc_blockchain }}
                            </span>
                          </h4>
                          <button type="button" class="btn btn-sm btn-primary" @click="confirm_withdraw()">Confirmar retiro</button>
                          <button type="button" class="btn btn-sm btn-danger" @click="decline_withdraw()">Rechazar retiro</button>
                        </center>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
  `,
  data() {
    return {
      Style : {
        marginBottom : {
          'margin-bottom' : '15px'
        },
        marginTop : {
          'margin-top' : '15px'
        },
        progress : 0
      },
      withdraw : {
        created_at : null,
        description: null,
        id: null,
        is_retirement: null,
        mount: null,
        mount_receive: null,
        pending: null,
        status: null,
        token: null,
        user:{
          name : null,
          last_name : null,
          user_name : null
        },
        user_edc_blockchain : null,
        user_id : null
      }
    }
  },
  created(){
    data.component_withdraw_verify_modal = this
  },
  methods:{
    confirm_withdraw : function(){

      Swal.fire({
        width: 600,
        title: 'Confirmación',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return axios.put(getApiURL()+'/confirm_withdraw', {
            withdraw_id : this.withdraw.id
          })
          .then(response => {
            if (response.status != '200') {
              throw new Error(response.statusText)
            }
            return response.data.data;
          })
         .catch(error => {
           Swal.showValidationMessage(
             `Request fail: ${error}`
           )
         });
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then(result => {
          if(result.value){
            Swal.fire({
              width: 650,
              icon: 'success',
              title: 'Retiro confirmado.'
            })
          data.component_withdrawals.get_withdrawal_pending();
          data.component_withdrawals.get_withdrawal_payment();
          $('#close_modal_withdrawal').click();
         }
      })
    },
    decline_withdraw : function(){

      Swal.fire({
        width: 600,
        title: 'Confirmación',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Rechazar',
        confirmButtonColor: 'red',
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return axios.put(getApiURL()+'/decline_withdraw', {
            withdraw_id : this.withdraw.id
          })
          .then(response => {
            if (response.status != '200') {
              throw new Error(response.statusText)
            }
            return response.data.data;
          })
         .catch(error => {
           Swal.showValidationMessage(
             `Request fail: ${error}`
           )
         });
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then(result => {
          if(result.value){
            Swal.fire({
              width: 650,
              icon: 'success',
              title: 'Retiro rechazado.'
            })
            data.component_withdrawals.get_withdrawal_pending();
            data.component_withdrawals.get_withdrawal_payment();
            $('#close_modal_withdrawal').click();
          }
      })
    }
  }
});

Vue.component('instalaciones-module',
{
  template:`
  <div :style="Styles.marginTop">
    <center>
      <h1 class="display-4">
        Gestion de las instalaciones
      </h1>
    </center>
    <div class="card bg-light mb-3" :style="Styles.marginBottom">
      <div class="card-body">
        <div class="row">
          <div class="col-md-8 col-sm-8 col-lg-8">
            <div class="form-inline">
              <div class="form-group"> <!-- Full Name -->
                  <div class="col-md-3 offset-md-2">
                      <label class="col-form-label">Instalación</label>
                  </div>
              </div>
              <div class="form-group">
                  <div class="offset-md-1 input-group">
                      <input v-model="filtro" type="text" class="form-control" id="instalacion" name="instalacion" placeholder="Ingrese la instalación">
                  </div>
              </div>
            </div>
          </div>
          <div :style="Styles.marginBottom" class="text-md-right col-md-4 col-sm-4 col-lg-4">
            <button type="button" class="btn btn-primary" @click="deploy_form = true">Nueva instalación</button>
          </div>
        </div>
      </div>
      <div class="table-responsive">
        <table id="tabla-estudiantes" class="table table-striped table-hover no-wrap">
          <thead>
              <tr>
                <th>Instalacion</th>
                <th>Acción</th>
              </tr>
          </thead>
            <paginate name="instalaciones" :list="instalaciones" :per="5" tag="tbody">
              <tr v-if="instalaciones.length == 0">
                <td :style="Styles.middleAlign" colspan="6">
                  <center>
                    <h4 style="margin: 0;">
                      <label style="margin: 0;">
                        Sin registros
                      </label>
                    </h4>
                  </center>
                </td>
              </tr>
              <tr v-for="instalacion in paginated('instalaciones')">
                <td :style="Styles.middleAlign">
                  {{ instalacion.cede }}
                </td>
                <td>
                  <button type="button" class="btn btn-primary btn-sm" @click="displayInstalacion(instalacion)"><strong>Modificar</strong></button>
                  <button type="button" class="btn btn-danger btn-sm" @click="deleteInstalacion"><strong>Eliminar</strong></button>
                </td>
              </tr>
            </paginate>
        </table>
      </div>
    </div>
    <center>
      <h1 class="display-4">
        Datos de la instalación
      </h1>
    </center>
    <div class="row">
      <div class="col-md-12 col-sm-12 col-lg-12">
        <div v-if="instalacion_selected == false && deploy_form == false" class="card bg-light mb-3">
          <div class="card-body">
            <div class="row">
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 mb-12">
                <center>
                  <h1 v-if="instalaciones.length > 0">
                    <small class="text-muted">Pulse <span class="badge badge-primary">Modificar</span> en la fila de la instalación para ver los campos</small>
                  </h1>
                </center>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="card bg-light">
          <div class="card-body">
            <div class="form-group mb-1">
                <div class="col-md-3">
                    <label class="col-form-label">Cede</label>
                </div>
            </div>
            <div class="form-group mb-3">
              <div class="col-md-6 input-group">
                  <input v-model="instalacion.cede" type="text" class="form-control" id="cede" name="cede" placeholder="Ingrese la cede">
              </div>
            </div>
            <div class="col-md-6">
              <div class="card-header">
                <h5 style="margin: 0">
                  Aulas:
                </h5>
              </div>
              <div class="form-group card card-body">
                <div id="container-secciones">
                  <div v-for="(aula, index) in instalacion.aulas" class="form-group row mb-1">
                    <div v-if="index > 0" class="col-md-12">
                      <hr>
                    </div>
                    <div class="col-md-5">
                      <label class="col-form-label">Identificador del aula:</label>
                    </div>
                    <div class="col-md-6">
                      <input type="text" v-model="aula.name" class="form-control" name="seccion" aria-label="Sección">
                    </div>
                    <div v-if="aula.hasOwnProperty('id')" class="col-md-12 text-md-right mt-2">
                      <button @click="modifyAula" class="btn btn-success btn-sm" id="other_seccion"><strong>Modificar</strong></button>
                      <button @click="deleteAula" class="btn btn-danger btn-sm" id="delete_seccion"><strong>Eliminar</strong></button>
                    </div>
                  </div>
                </div>
                <hr>
                <div class="row">
                  <div class="col-md-12">
                    <button v-if="instalacion_selected" class="btn btn-success btn-sm" @click="addAulas">Añadir aulas</button>
                    <button @click="deleteRow" :disabled="boolean_delete" style="float:right;" class="badge badge-pill badge-danger" id="delete_seccion"><strong>-</strong></button>
                    <button @click="addRow" style="float:right;" class="badge badge-pill badge-primary" id="other_seccion"><strong>+</strong></button>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-12">
              <div class="row justify-content-center">
                <div class="col-md-6 text-md-center">
                  <button v-if="deploy_form" class="btn btn-primary btn-sm" id="crear" @click="registrarInstalacion">Registrar instalación</button>
                  <button v-else type="submit" class="btn btn-sm btn-success" @click="modificarInstalacion">Modificar</button>
                  <button class="btn btn-sm btn-danger" @click="cancel">Cancelar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `,
  data() {
    return {
      Styles : {
        middleAlign : {
          'vertical-align': 'middle'
        },
        marginBottom : {
          'margin-bottom' : '15px'
        },
        marginTop : {
          'margin-top' : '15px'
        },
        scrollX : {
          'overflow-x' : 'auto',
          'white-space' : 'nowrap'
        }
      },
      instalaciones : [],
      instalacion : {
        aulas : []
      },
      filtro : '',
      paginate : ['instalaciones'],
      html_content : '<center>\
                        <div class="col-md-8"><hr></div>\
                          <h6>Seleccione carrera para cargar la malla curricular</h6>\
                        <div class="col-md-8"><hr></div>\
                      </center>',
      instalacion_selected : false,
      deploy_form : false,
      boolean_delete : true
    }
  },
  created(){
    data.component_instalaciones_module = this
    this.getInstalaciones()
  },
  methods:{
    deleteRow : function(){

      this.instalacion.aulas.splice((this.instalacion.aulas.length-1), 1)
      if(this.instalacion.aulas.length == 0)
        this.boolean_delete = true
    },
    addRow : function(){

      this.instalacion.aulas.push({})
      this.boolean_delete = false
    },
    getInstalaciones : function(){

      axios.post(getApiURL()+'/configuracion/get_instalaciones')
      .then(response => {
          this.instalaciones = response.data.data;
          // console.log(response.data.data)
      })
      .catch(error => {

      });
    },
    displayInstalacion : function(instalacion){

      this.instalacion = instalacion;
      this.instalacion_selected = true;
    },
    registrarInstalacion : function(){

      Swal.fire({
        width: 550,
        title: 'Confirmación',
        icon: 'info',
        html: '¿Esta seguro de registrar esta instalación?',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return axios.put(getApiURL() +'/configuracion/nueva_cede', {
            instalacion : this.instalacion
          })
          .then(response => {

            if(response.status != '200') {
              throw new Error(response.statusText)
            }
            return response.data.data;
          })
         .catch(error => {

           if(error.response.data.error.status_code == '422'){

             if(error.response.data.error.code == '0'){
               Swal.showValidationMessage(
                 `Llene los campos.`
               )
             }else if(error.response.data.error.code == '2'){
                Swal.showValidationMessage(
                  error.response.data.error.message
                )
             }else if(error.response.data.error.code == '3'){
                Swal.showValidationMessage(
                  error.response.data.error.message
                )
             }
           }else{
             Swal.showValidationMessage(
               `Request fail: ${error}`
             )
           }
         });
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then(result => {
        if(result.value){
          Swal.fire({
            width: 650,
            icon: 'success',
            title: 'Registro realizado.'
          })
          this.getInstalaciones()
          this.instalacion = {
            aulas : []
          }
          this.deploy_form = false;
        }
      })
    },
    modificarInstalacion : function(){

      Swal.fire({
        width: 550,
        title: 'Confirmación',
        icon: 'info',
        html: '¿Esta seguro de modificar esta instalación?',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return axios.put(getApiURL() +'/configuracion/modificar_cede', {
            instalacion : this.instalacion
          })
          .then(response => {

          })
          .catch(error => {

            if(error.response.data.error.status_code == '422'){

              if(error.response.data.error.code == '0'){
               Swal.showValidationMessage(
                 `Llene los campos.`
               )
             }else if(error.response.data.error.code == '2'){
                Swal.showValidationMessage(
                  error.response.data.error.message
                )
             }else if(error.response.data.error.code == '3'){
                Swal.showValidationMessage(
                  error.response.data.error.message
                )
             }
           }else{
             Swal.showValidationMessage(
               `Request fail: ${error}`
             )
           }
         });
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then(result => {
        if(result.value){
          Swal.fire({
            width: 650,
            icon: 'success',
            title: 'Actualizada.'
          })
        }
      })
    },
    deleteInstalacion : function(e){

      let element_index = $(e.currentTarget).parent().parent().index();
      let instalacion = this.instalaciones[element_index];

      Swal.fire({
        width: 550,
        icon: 'warning',
        html: '¿Esta seguro de eliminar esta instalación?',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        showLoaderOnConfirm: true,
        preConfirm: () => {

          return axios.put(getApiURL() +'/configuracion/delete_cede', {
            instalacion_id : instalacion.id
          })
          .then(response => {

            Vue.delete(this.instalaciones, element_index)
          })
         .catch(error => {

           if(error.response.data.error.status_code == '422'){

              Swal.showValidationMessage(
                error.response.data.error.message
              )
           }else{

              Swal.showValidationMessage(
                `Request fail: ${error}`
              )
           }
         });
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then(result => {
        if(result.value){
          Swal.fire({
            width: 650,
            icon: 'success',
            title: 'Eliminada.'
          })
        }
      })
    },
    modifyAula : function(e){

      let element = $(e.currentTarget);
      let aula = this.instalacion.aulas[element.parent().parent().index()]

      Swal.fire({
        width: 550,
        icon: 'info',
        html: '¿Esta seguro de modificar esta aula?',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        showLoaderOnConfirm: true,
        preConfirm: () => {

          return axios.put(getApiURL() +'/configuracion/modify_aula', {
            aula : aula
          })
          .then(response => {
          })
         .catch(error => {

           if(error.response.data.error.status_code == '422'){

              Swal.showValidationMessage(
                error.response.data.error.message
              )
           }else{

              Swal.showValidationMessage(
                `Request fail: ${error}`
              )
           }
         });
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then(result => {
        if(result.value){
          Swal.fire({
            width: 650,
            icon: 'success',
            title: 'Actualización realizada.'
          })
        }
      })
    },
    deleteAula : function(e){

      let element_index = $(e.currentTarget).parent().parent().index();
      let aula = this.instalacion.aulas[element_index]

      Swal.fire({
        width: 550,
        icon: 'warning',
        html: '¿Esta seguro de eliminar esta aula?',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        showLoaderOnConfirm: true,
        preConfirm: () => {

          return axios.put(getApiURL() +'/configuracion/delete_aula', {
            aula_id : aula.id
          })
          .then(response => {

            Vue.delete(this.instalacion.aulas, element_index)
          })
         .catch(error => {

           if(error.response.data.error.status_code == '422'){

              Swal.showValidationMessage(
                error.response.data.error.message
              )
           }else{

              Swal.showValidationMessage(
                `Request fail: ${error}`
              )
           }
         });
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then(result => {
        if(result.value){
          Swal.fire({
            width: 650,
            icon: 'success',
            title: 'Eliminada.'
          })
        }
      })
    },
    addAulas : function(){

      Swal.fire({
        width: 550,
        title: 'Confirmación',
        icon: 'info',
        html: '¿Esta seguro de añadir una nueva aula?',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        showLoaderOnConfirm: true,
        preConfirm: () => {

          return axios.put(getApiURL() +'/configuracion/add_aulas', {
            instalacion : this.instalacion
          })
          .then(response => {

            this.instalacion = response.data.data
          })
         .catch(error => {

           if(error.response.data.error.status_code == '422'){

             if(error.response.data.error.code == '0'){
               Swal.showValidationMessage(
                 `Llene los campos.`
               )
             }else if(error.response.data.error.code == '2'){
                Swal.showValidationMessage(
                  error.response.data.error.message
                )
             }else if(error.response.data.error.code == '3'){
                Swal.showValidationMessage(
                  error.response.data.error.message
                )
             }
           }else{
             Swal.showValidationMessage(
               `Request fail: ${error}`
             )
           }
         });
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then(result => {
        if(result.value){
          Swal.fire({
            width: 650,
            icon: 'success',
            title: 'Actualización realizada.'
          })
        }
      })
    },
    cancel : function(){
      this.instalacion = {
        aulas : []
      };
      this.instalacion_selected = false;
      this.deploy_form = false;
    }
  }
});

var app = new Vue({
  el: '#app',
  data : data,
  mounted(){
    window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    let token = document.head.querySelector('meta[name="csrf-token"]');
      if (token) {
         window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
      } else {
        console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
      }
  }
});
