import React from "react";
import {
  Button,
  Text,
  View,
  StyleSheet,
  RefreshControl,
  ScrollView,
  Dimensions
} from "react-native";
import { getRequest } from "./../../lib/requests";
import APIRoutes from "./../../lib/routes";
import MessageCard from "./../../components/MessageCard";
import BaseScreen from "../BaseScreen";
import HTML from "react-native-render-html";

// Make sure to add your new screen to /config/navigation.js
const htmlContent = `<p>BOSTON, Massachusetts, USA -- Tuesday, January 30, 2018 -- The Free
Software Foundation (FSF) announced it has received a record-breaking
charitable contribution of 91.45 Bitcoin from the Pineapple Fund,
valued at $1 million at the time of the donation. This gift is a
testament to the importance of free software, computer user freedom,
and digital rights when technology is interwoven with daily life.</p>
<p>"Free software is more than open source; it is a movement that
encourages community collaboration and protects users' freedom," wrote
Pine, the Pineapple Fund's founder. "The Free Software Foundation does
amazing work, and I'm certain the funds will be put to good use."</p>
<p>"The FSF is honored to receive this generous donation from the
Pineapple Fund in service of the free software movement," said John
Sullivan, FSF executive director. "We will use it to further empower
free software activists and developers around the world. Now is a
critical time for computer user freedom, and this gift will make a
tremendous difference in our ability, as a movement, to meet the
challenges."</p>
<p>The anonymous Pineapple Fund, created to give away $86 million worth
of Bitcoin to charities and social causes, "is about
making bold and smart bets that hopefully impact everyone in our
world."</p>
<p>The FSF believes free software does impact everyone, and this gift from
the Pineapple Fund will be used to:</p>
<ul>
<li>
<p>Increase innovation and the number of new projects in high priority
   areas of free software development, including the GNU Project;</p>
</li>
<li>
<p>Expand the FSF's licensing, compliance, and hardware device
   certification programs;</p>
</li>
<li>
<p>Bring the free software movement to new audiences;</p>
</li>
<li>
<p>Contribute to the long-term stability of the organization.</p>
</li>
</ul>
<h3>About the Free Software Foundation</h3>
<p>The Free Software Foundation, founded in 1985, is dedicated to
promoting computer users' right to use, study, copy, modify, and
redistribute computer programs. The FSF promotes the development and
use of free (as in freedom) software -- particularly the GNU operating
system and its GNU/Linux variants -- and free documentation for free
software. The FSF also helps to spread awareness of the ethical and
political issues of freedom in the use of software, and its Web sites,
located at <a href="https://fsf.org">https://fsf.org</a> and <a href="https://gnu.org">https://gnu.org</a>, are an important
source of information about GNU/Linux. Donations to support the FSF's
work can be made at <a href="https://donate.fsf.org">https://donate.fsf.org</a>. Its headquarters are in Boston, MA, USA.</p><p>More information about the FSF, as well as important information forjournalists and publishers, is at <a href="https://www.fsf.org/press">https://www.fsf.org/press</a>.</p><h3>Media Contacts</h3><p>John Sullivan<br />
Executive Director<br />
Free Software Foundation<br />
+1 (617) 542 5942<br />
<a href="mailto:campaigns@fsf.org">&#99;&#97;&#109;&#112;&#97;&#105;&#103;&#110;&#115;&#64;&#102;&#115;&#102;&#46;&#111;&#114;&#103;</a></p>`;
class NewsDetailScreen extends BaseScreen {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}

  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
        <Text>{this.props.navigation.getParam("title")}</Text>
        <HTML
          html={htmlContent}
          imagesMaxWidth={Dimensions.get("window").width}
        />
      </ScrollView>
    );
  }
}

export default NewsDetailScreen;
