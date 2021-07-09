<template>
    <div id="modal">
        <div class="backdrop" @click="hideOrderForm"></div>
        <div class="modalBody">
        <div class="formContainer" id="orderForm">
            <h3 class="text-center">Update Details</h3>
            <form class="orderForm" @submit.prevent="onSubmit">
            <ul>
                <li>
                <input
                    type="text"
                    v-model="uname"
                    class="form-control form-control-lg"
                />
                <input
                    type="hidden"
                    v-model.number="uid"
                    class="form-control form-control-lg"
                />
                </li>
                <li>
                <input
                    type="email"
                    v-model="uemail"
                    class="form-control form-control-lg"
                />
                </li>
                <li>
                <input
                    type="text"
                    v-model="upassword"
                    class="form-control form-control-lg"
                />
                </li>
                <li>
                <input type="submit" value="Submit" />
                </li>
            </ul>
            </form>
        </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters} from 'vuex'
export default {
    name: 'UserUpdate',
  props: {
        id: {
            type: Number,
        },
        name: {
            type: String,
        },
        email: {
            type: String,
        },
        password: {
            type: String,
        }
  },
  data() {
        return {
            uid: this.id,
            uname: this.name,
            uemail: this.email,
            upassword: this.password
        }
    },
    cumputed: {
        ...mapGetters(['getLoginUser'])
    },
    methods: {
        ...mapActions(['updateUser']),
        hideOrderForm() {
            this.$emit("toggle-user-form");
        },
        onSubmit() {
            let userDetails = {
                id: this.uid,
                name: this.uname,
                email: this.uemail,
                password: this.upassword
            }

            this.updateUser(userDetails);
            this.hideOrderForm();
        }
    }
}
</script>
<style>
.bi {
  cursor: pointer;
}
</style>