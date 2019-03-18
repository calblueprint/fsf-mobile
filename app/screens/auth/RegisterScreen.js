import React from 'react';

class RegisterScreen extends BaseScreen {
    constructor(props) {
        super(props);
        //loading might not be necessary, it's just slow enough to be annoying lmao
        this.state = {
            email: '',
            password: '',
            result: null,
            componentDidMount: false,
            };
      }

    static navigationOptions = {
        headerVisible: false
    };

    render() {
        let amountOptions1 = [
          '$10',
          '$25',
          '$50'
        ];
      
        let amountOptions2 = [
          '$100',
          '$250',
          '$500'
        ];
    
        let amountOptButtons1 = amountOptions1.map((amt, i) => 
        < Button key={i} onPress={() => this._changeAmount(amt)} title={amt} />);
        
        let amountOptButtons2 = amountOptions2.map((amt, i) => 
        < Button key={i+3} onPress={() => this._changeAmount(amt)} title={amt} />);
    
        if (this.state.loading) {
          return (
          <View>
            <Text> Loading, please wait... </Text>
          </View>
          )
        } else {
          return <View style={{ flex: 1, alignItems: "center", justifyContent: "space-between" }}>
              <View>
                <Text
                  style={{ fontWeight: "bold", fontSize: 20, color: "#64696B" }}
                >
                  Support the Free Software Foundation
                </Text>
                <Text>
                  Your support makes the Free Software Foundation's work
                  possible. Will you power up the free software movement with a
                  donation today?
                </Text>
              </View>
              
              <View style={{ alignItems: "center" }}>
                <TextInput style={{ fontSize: 45, color: "#64696B" }} onChangeText={amt => this._changeAmount(amt)} value={"$" + this.state.amount.toString()} />
                <View
                  style={{ justifyContent: "center", flexDirection: "row" }}
                >
                  {amountOptButtons1}
                </View>
                <View
                  style={{ justifyContent: "center", flexDirection: "row" }}
                >
                  {amountOptButtons2}
                </View>
              </View>
    
              <View style={{ marginTop: 25 }} />
              {this.state.savedCC ? <View style={{ flex: 1, alignItems: "center" }}>
                  <Button onPress={() => this._goToNext(true)} title="use saved credit card info" />
                  <Text style={{ fontWeight: "bold", color: "#64696B" }}>
                    {" "}
                    or{" "}
                  </Text>
                  <Button onPress={() => this._goToNext(false)} title="enter payment info" />
                </View> : <Button onPress={() => this._goToNext(false)} title="start" />}
            </View>;
        }
        
      }
}
export default RegisterScreen;