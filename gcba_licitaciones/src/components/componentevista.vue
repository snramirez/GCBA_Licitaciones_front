
 <template>
 <V-container>
    <v-btn @click="close()">
        Cerrar
    </v-btn>
<!--Primera targeta-->
<v-row>
    <v-col cols="6">
     <v-card max-width="35em">
              <v-card-title class="subheading font-weight-bold">
                bidding
              </v-card-title>

              <v-divider></v-divider>
                <v-list dense>
                 <v-list-item-content>BiddingNumber:</v-list-item-content>
                    <v-list-item-content class="align-end">
                        {{ bidding.BiddingNumber}}
                    </v-list-item-content>
                <v-list-item>
                <v-list-item-content>Record:</v-list-item-content>
                    <v-list-item-content class="align-end">
                        {{bidding.Record}}
                    </v-list-item-content>
                </v-list-item>
                <v-list-item>
                    <v-list-item-content>RecordBAC:</v-list-item-content>
                        <v-list-item-content class="align-end">
                            {{bidding.RecordBAC}}
                        </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                        <v-list-item-content>Bidding:</v-list-item-content>
                        <v-list-item-content class="align-end">
                            {{bidding.Bidding}}
                        </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                        <v-list-item-content>Division:</v-list-item-content>
                        <v-list-item-content class="align-end">
                            {{bidding.Division}}
                        </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                        <v-list-item-content>Responsable:</v-list-item-content>
                        <v-list-item-content class="align-end">
                            {{bidding.Responsable}}
                        </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                        <v-list-item-content>BiddingType:</v-list-item-content>
                        <v-list-item-content class="align-end">
                            {{bidding.BiddingType}}
                        </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                        <v-list-item-content> OfficialBudget:</v-list-item-content>
                        <v-list-item-content class="align-end">
                            {{bidding.OfficialBudget}}
                        </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                        <v-list-item-content> Status:</v-list-item-content>
                        <v-list-item-content class="align-end">
                            {{bidding.Status}}
                        </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                        <v-list-item-content> EntryDocumentReview:</v-list-item-content>
                        <v-list-item-content class="align-end">
                            {{bidding.EntryDocumentReview}}
                        </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                        <v-list-item-content> ExitDocumentReview:</v-list-item-content>
                        <v-list-item-content class="align-end">
                            {{bidding.ExitDocumentReview}}
                        </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                        <v-list-item-content> FirstPG:</v-list-item-content>
                        <v-list-item-content class="align-end">
                            {{bidding.FirstPG}}
                        </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                        <v-list-item-content> FirstLapPG:</v-list-item-content>
                        <v-list-item-content class="align-end">
                            {{bidding.FirstLapPG}}
                        </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                        <v-list-item-content> CallDate:</v-list-item-content>
                        <v-list-item-content class="align-end">
                            {{bidding.CallDate}}
                        </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                        <v-list-item-content> BidOpeningDate:</v-list-item-content>
                        <v-list-item-content class="align-end">
                            {{bidding.BidOpeningDate}}
                        </v-list-item-content>
                        </v-list-item> 
            </v-list>
        </v-card>
    </v-col>
        <v-divider></v-divider>
        <!-- segunda targeta-->
    <v-col cols="6">
        <v-card max-width="35em">
            <v-list dense>
                 <v-list-item>
                  <v-list-item-content> BidQuantity:</v-list-item-content>
                  <v-list-item-content class="align-end">
                    {{bidding.BidQuantity}}
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content> PreAdjudgmentActDate:</v-list-item-content>
                  <v-list-item-content class="align-end">
                    {{bidding.PreAdjudgmentActDate}}
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content> PreAdjudgmentActNumber:</v-list-item-content>
                  <v-list-item-content class="align-end">
                    {{bidding.PreAdjudgmentActNumber}}
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content> SecondPG:</v-list-item-content>
                  <v-list-item-content class="align-end">
                    {{bidding.SecondPG}}
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content> DayQuantity:</v-list-item-content>
                  <v-list-item-content class="align-end">
                    {{bidding.DayQuantity}}
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content> ApproveNumber:</v-list-item-content>
                  <v-list-item-content class="align-end">
                    {{bidding.ApproveNumber}}
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content> AllocatedBudget:</v-list-item-content>
                  <v-list-item-content class="align-end">
                    {{bidding.AllocatedBudget}}
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content> SPO:</v-list-item-content>
                  <v-list-item-content class="align-end">
                    {{bidding.SPO}}
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content> Contractor:</v-list-item-content>
                  <v-list-item-content class="align-end">
                    {{bidding.Contractor}}
                  </v-list-item-content>
                </v-list-item>
                 <v-list-item>
                  <v-list-item-content> ContractDate:</v-list-item-content>
                  <v-list-item-content class="align-end">
                    {{bidding.ContractDate}}
                  </v-list-item-content>
                </v-list-item>
                 <v-list-item>
                  <v-list-item-content> ProcedureDays:</v-list-item-content>
                  <v-list-item-content class="align-end">
                    {{bidding.ProcedureDays}}
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content> Observations:</v-list-item-content>
                  <v-list-item-content class="align-end">
                    {{bidding.Observations}}
                  </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-card>
   </v-col>     
</v-row>
        

</V-container>

</template>
<script >
export default {
    props:{
        bidding: Object
    },
    data() {
        return {
            // bidding: {
            //     BiddingNumber: "10179-0023-LPU22",
            //     Record: "EX-2021-39567307- -GCABA-DGIT",
            //     RecordBAC: "EX-2022-10627532-GCABA-DGCCYA",
            //     Bidding: "METROBUS DEL BAJO ETAPA II - PARADORES",
            //     Division: "DGIT",
            //     Responsable: "DGIT",
            //     BiddingType: "LIC PUBLICA",
            //     OfficialBudget: 1543271218.94,
            //     Status: "EN ESPERA",
            //     EntryDocumentReview: "1\/27\/2022",
            //     ExitDocumentReview: "2\/9\/2022",
            //     FirstPG: null,
            //     FirstLapPG: null,
            //     CallDate: "6\/24\/2020",
            //     BidOpeningDate: "7\/6\/2020",
            //     BidQuantity: "4 ofertas",
            //     PreAdjudgmentActDate: "8\/4\/2020",
            //     PreAdjudgmentActNumber: "5-20",
            //     SecondPG: null,
            //     SecondLapPG: null,
            //     DayQuantity: "-",
            //     ApproveNumber: "DI-2020-9-GCABA-UPEIG",
            //     ApproveDate: "8\/12\/2020",
            //     AllocatedBudget: 9217091.33,
            //     SPO: -0.04978439896907216,
            //     Contractor: "ROL INGENIERIA SA",
            //     ContractDate: "8\/24\/2020",
            //     ProcedureDays: 49,
            //     Observations: "Plazo de ejecución 5 meses."
            // },
        }
    },
    methods:{
        close(){
            this.$emit("close")
        }
    }

}

</script>

<style>

</style>