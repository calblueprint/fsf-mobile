import React from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import Stepper from "react-native-js-stepper";

class StepperComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const styles = StyleSheet.create({
            activeDot: {
                backgroundColor: 'grey'
            },
            inactiveDot: {
                backgroundColor: '#ededed'
            },
            activeStep: {
                backgroundColor: 'grey'
            },
            inactiveStep: {
                backgroundColor: '#ededed'
            },
            activeStepTitle: {
                fontWeight: 'bold'
            },
            inactiveStepTitle: {
                fontWeight: 'normal'
            },
            activeStepNumber: {
                color: 'white'
            },
            inactiveStepNumber: {
                color: 'black'
            }
        });

        return (
            <Stepper style={{height: 10, margin: 0, padding: 0}}
            initialPage={this.props.index} steps={["Amount", "Billing", "Payment"]} validation={false} activeDotStyle={styles.activeDot} inactiveDotStyle={styles.inactiveDot} showTopStepper={true} showBottomStepper={false} activeStepStyle={styles.activeStep} inactiveStepStyle={styles.inactiveStep} activeStepTitleStyle={styles.activeStepTitle} inactiveStepTitleStyle={styles.inactiveStepTitle} activeStepNumberStyle={styles.activeStepNumber} inactiveStepNumberStyle={styles.inactiveStepNumber}>
                <Text> hello</Text>
            </Stepper>
        );
        
    }
}
export default StepperComponent;
