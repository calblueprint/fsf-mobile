#!/bin/bash

# remove duplicate style={{flex:1}} in the library

FILE=node_modules/react-native-flip-card/lib/FlipCard.js

LINE169=$(sed -n '169p' $FILE)
LINE173=$(sed -n '173p' $FILE)


if [ $LINE169 = "style={{flex:1}}" ] && [ "$LINE173 = 'style={{flex: 1}}'" ]; then
    echo 'REMOVING line 169 from react-native-flip-card'

    sed -i '169d' $FILE
fi

