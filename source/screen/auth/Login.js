import React, { useEffect } from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import GlobalInclude from "../../globalInclude/GlobalInclude";
import Helper from "../../helper/Helper";

const login = () => {
  return (
    <View style={styles.mainView}>
      <GlobalInclude.Statusbar
        backgroundColor={GlobalInclude.Color.ColorBlack}
      />
      <View style={styles.innerView}>
        <GlobalInclude.Text
          text={"Login Screen"}
          textStyle={{ fontSize: 17, textAlign: "center", marginTop: 200 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  innerView: {
    flex: 1,
    backgroundColor: GlobalInclude.Color.Colorwhite,
  },
});

export default login;
