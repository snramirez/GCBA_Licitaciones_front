
 <template>
  <V-container>
    <!--Primera targeta-->
    <v-row justify="center">
      <v-col>
        <h1 text-center>Pliego</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col align-self="end">
        <v-btn @click="close()" color="orange darken-1">
          <v-icon dark left>
            mdi-arrow-left
          </v-icon>
          Volver
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <v-card>
          <v-list dense>
            <v-list-item>
              <v-list-item-content>BiddingNumber:</v-list-item-content>
              <v-list-item-content class="align-end">
                {{ bidding.BiddingNumber }}
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content>Record:</v-list-item-content>
              <v-list-item-content class="align-end">
                {{ bidding.Record }}
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content>RecordBAC:</v-list-item-content>
              <v-list-item-content class="align-end">
                {{ bidding.RecordBAC }}
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content>Bidding:</v-list-item-content>
              <v-list-item-content class="align-end">
                {{ bidding.Bidding }}
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content>Division:</v-list-item-content>
              <v-list-item-content class="align-end">
                {{ bidding.Division }}
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content>Responsable:</v-list-item-content>
              <v-list-item-content class="align-end">
                {{ bidding.Responsable }}
              </v-list-item-content>
            </v-list-item>  

            <v-list-item>
              <v-list-item-content>BiddingType:</v-list-item-content>
              <v-list-item-content class="align-end">
                {{ bidding.BiddingType }}
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content> OfficialBudget:</v-list-item-content>
              <v-list-item-content class="align-end">
              <v-text-field v-money="money" :value="formatBudget(bidding.OfficialBudget)" readonly></v-text-field>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content> Status:</v-list-item-content>
              <v-list-item-content class="align-end">
                {{ bidding.Status }}
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content> EntryDocumentReview:</v-list-item-content>
              <v-list-item-content class="align-end">
                {{ bidding.EntryDocumentReview }}
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content> ExitDocumentReview:</v-list-item-content>
              <v-list-item-content class="align-end">
                {{ bidding.ExitDocumentReview }}
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content> FirstPG:</v-list-item-content>
              <v-list-item-content class="align-end">
                {{ bidding.FirstPG }}
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content> FirstLapPG:</v-list-item-content>
              <v-list-item-content class="align-end">
                {{ bidding.FirstLapPG }}
              </v-list-item-content>
            </v-list-item>

          </v-list>
        </v-card>
      </v-col>

      <!-- segunda targeta-->

      <v-col cols="12" md="6">
        <v-card>
          <v-list dense>

            <v-list-item>
              <v-list-item-content> CallDate:</v-list-item-content>
              <v-list-item-content class="align-end">
                {{ formatDate2(bidding.CallDate)  }}
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content> BidOpeningDate:</v-list-item-content>
              <v-list-item-content class="align-end">
                {{ formatDate2(bidding.BidOpeningDate) }}
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content> BidQuantity:</v-list-item-content>
              <v-list-item-content class="align-end">
                {{ bidding.BidQuantity }}
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content> PreAdjudgmentActDate:</v-list-item-content>
              <v-list-item-content class="align-end">
                {{ formatDate2(bidding.PreAdjudgmentActDate)}}
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content> PreAdjudgmentActNumber:</v-list-item-content>
              <v-list-item-content class="align-end">
                {{ bidding.PreAdjudgmentActNumber }}
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content> SecondPG:</v-list-item-content>
              <v-list-item-content class="align-end">
                {{ formatDate2(bidding.SecondPG) }}
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content> DayQuantity:</v-list-item-content>
              <v-list-item-content class="align-end">
                {{ bidding.DayQuantity }}
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content> ApproveNumber:</v-list-item-content>
              <v-list-item-content class="align-end">
                {{ bidding.ApproveNumber }}
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content> AllocatedBudget:</v-list-item-content>
              <v-list-item-content class="align-end">
               <v-text-field v-money="money" :value="formatBudget(bidding.AllocatedBudget)" readonly></v-text-field>  
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content> SPO:</v-list-item-content>
              <v-list-item-content class="align-end">
                {{ bidding.SPO }}
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content> Contractor:</v-list-item-content>
              <v-list-item-content class="align-end">
                {{ bidding.Contractor }}
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content> ContractDate:</v-list-item-content>
              <v-list-item-content class="align-end">
                {{ formatDate2(bidding.ContractDate)}}
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content> ProcedureDays:</v-list-item-content>
              <v-list-item-content class="align-end">
                {{ bidding.ProcedureDays }}
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content> Observations:</v-list-item-content>
              <v-list-item-content class="align-end">
                {{ bidding.Observations }}
              </v-list-item-content>
            </v-list-item>

          </v-list>
        </v-card>
      </v-col>
    </v-row>


  </V-container>

</template>
<script >

const moment = require("moment");
import 'moment/locale/es'
moment.locale('es')
import {VMoney} from "v-money"

export default {
  props: {
    bidding: Object
  },
  directives: { money: VMoney },
  data() {
    return {
      money: {
        decimal: ".",
        thousands: ",",
        max: 10000000000000,
        min: 0.01,
        }

    }
  },
  methods: {
    close() {
      this.$emit("close")
    },

     formatDate2(date) {
      if (!date) return;
      return moment(date).calendar();
    },
    
    formatBudget(budget){
      return budget === null ? 0 : budget.$numberDecimal
    }
  }

}

</script>

<style>
</style>