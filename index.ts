import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
//import '@polymer/iron-ajax/iron-ajax.js';
//<iron-ajax auto="" url="https://test.sparqlist.glyconavi.org/api/GlycoSample_Disease_List_chart" handle-as="json" last-response="{{diseaseresultdata}}"></iron-ajax>

class IdSearch extends PolymerElement {
  static get template() {
    return html`
<style type="text/css">
</style>
<div class="globalNavSearch">
  <form on-submit="handleSubmit">
    <input type="text" placeholder="Accession Number" name="aNum" on-submit="handleSubmit" id="aNum"/>
  </form>
</div>
selection: [[selection]]
`;
  }
  static get properties() {
    return {
      selection: {
        notify: true,
        type: String,
        value: function () {
          return new String();
        }
      }
    };
  }

  ready() {
    super.ready();
    console.log("ready");
  }
  handleClick(e) {
    console.log('click');
  }
  handleSubmit(e) {
    e.preventDefault();
    console.log("submit");
    console.log(this.shadowRoot.getElementById("aNum").value);

    var self = this;
    fetch("https://test.sparqlist.glycosmos.org/sparqlist/api/gtc_ask_exist_accnum?accession=" + this.shadowRoot.getElementById("aNum").value).then(response => {
      if (response.ok) {
        console.log("ok");
        // console.log(response.json());
        // console.log(JSON.stringify(response));

        // Examine the text in the response
        response.json().then(function (data) {
          console.log("data:>");
          console.log(data);
          console.log(data);
          console.log(data.doesExist);
          self.selection = data.doesExist;
        });
      }
      throw new Error('Network response was not ok.');
    }).catch(function (error) {
      console.log('There has been a problem with your fetch operation: ', error.message);
    });
    console.log("id");
    // console.log(id);
  }
  _handleAjaxPostError(e) {
    console.log('error: ' + e);
  }
}

customElements.define('gtc-wc-id-search', IdSearch);
