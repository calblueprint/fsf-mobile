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
const htmlContent = `<p>This position, reporting to the executive director, works closely with
our sysadmin team and chief technology officer to maintain and improve
the FSF's Web presence. The FSF uses several different free software
Web platforms in the course of our work, both internally and
externally. These platforms are critical to work supporting the GNU
Project, free software adoption, free media formats, and freedom on
the Internet; and to opposing bulk surveillance, Digital Restrictions
Management, software patents, and proprietary software.</p>
<p>We are looking for someone who is comfortable with keeping these
systems up-to-date and working, as well as customizing them when
necessary. While the main duties will relate to the backend systems,
frontend experience with templates, HTML, CSS, JavaScript, and design
tools will be a big plus. The web developer will help lead major
projects, such as the relaunch of <a href="https://www.fsf.org">https://www.fsf.org</a> and migration
of <a href="https://audio-video.gnu.org">https://audio-video.gnu.org</a> to GNU MediaGoblin. They will also
be part of the team running the annual LibrePlanet conference, and contribute to decisions about which new platforms to use or which
existing ones to retire.</p>
<p>Examples of platforms maintained by the web developer include, but are
not limited to:</p>
<ul>
<li>CiviCRM</li>
<li>Drupal</li>
<li>MediaWiki</li>
<li>Plone / Zope</li>
<li>Ikiwiki</li>
<li>Request Tracker</li>
<li>Etherpad</li>
<li>CAS</li>
<li>GNU social</li>
<li>GNU MediaGoblin</li>
<li>Icecast</li>
</ul>
<p>Because the FSF works globally and seeks to have our materials
distributed in as many languages as possible, multilingual candidates
will have an advantage. With our small staff of fourteen, each person
makes a clear contribution. We work hard, but offer a humane and fun
work environment at an office located in the heart of downtown Boston.</p>
<p>The FSF is a mature but growing organization that provides great
potential for advancement; existing staff get the first chance at any
new job openings. This position is also a good starting point for
anyone who might be interested in other roles on our technical team in
the future.</p>
<h2>Benefits and salary</h2>
<p>This job is a union position that must be worked on-site at the FSF's
downtown Boston office. The salary is fixed at $53,269/year, and is
non-negotiable. Benefits include:</p>
<ul>
<li>fully subsidized individual or family health coverage through Blue Cross Blue Shield;<br />
</li>
<li>partially subsidized dental plan;</li>
<li>four weeks of paid vacation annually;<br />
</li>
<li>seventeen paid holidays annually;<br />
</li>
<li>weekly remote work allowance;<br />
</li>
<li>public transit commuting cost reimbursement;<br />
</li>
<li>403(b) program with employer match;<br />
</li>
<li>yearly cost-of-living pay increases based on government guidelines;<br />
</li>
<li>health care expense reimbursement;<br />
</li>
<li>ergonomic budget;<br />
</li>
<li>relocation (to Boston area) expense reimbursement;<br />
</li>
<li>conference travel and professional development opportunities; and<br />
</li>
<li>potential for an annual performance bonus.</li>
</ul>
<h2>Application instructions</h2>
<p>Applications must be submitted via email to <a href="mailto:hiring@fsf.org">&#104;&#105;&#114;&#105;&#110;&#103;&#64;&#102;&#115;&#102;&#46;&#111;&#114;&#103;</a>. The
email must contain the subject line "web developer." A complete
application should include:</p>
<ul>
<li>resume;</li>
<li>cover letter; and</li>
<li>links to any previous work online.</li>
</ul>
<p>All materials must be in a free format. Email submissions that do not
follow these instructions will probably be overlooked. No phone calls
or paper applications, please.</p>
<p><strong>Applications will be reviewed on a rolling basis until the position is
filled. To guarantee consideration, submit your application by Friday,
November 30, 2018.</strong></p>
<p>The FSF is an equal opportunity employer and will not discriminate
against any employee or application for employment on the basis of
race, color, marital status, religion, age, sex, sexual orientation,
national origin, handicap, or any other legally protected status
recognized by federal, state or local law. We value diversity in our
workplace. Women, people of color and LGBTQ individuals are strongly
encouraged to apply.</p>
<h3>About the Free Software Foundation</h3>
<p>The Free Software Foundation, founded in 1985, is dedicated to
promoting computer users' right to use, study, copy, modify, and
redistribute computer programs. The FSF promotes the development and
use of free (as in freedom) software -- particularly the GNU operating
system and its GNU/Linux variants -- and free documentation for free
software. The FSF also helps to spread awareness of the ethical and
political issues of freedom in the use of software, and its Web sites,
located at <a href="https://www.fsf.org">https://www.fsf.org</a> and <a href="https://www.gnu.org">https://www.gnu.org</a>, are an important source of information
about GNU/Linux. Donations to support the FSF's work can be made at
<a href="https://donate.fsf.org">https://donate.fsf.org</a>. We are based in Boston, MA, USA.</p>
<p>More information about the FSF, as well as important information for
journalists and publishers, is at <a href="https://www.fsf.org/press">https://www.fsf.org/press</a>.</p>`;

class NewsDetailScreen extends BaseScreen {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}

  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
        <HTML
          html={htmlContent}
          imagesMaxWidth={Dimensions.get("window").width}
        />
      </ScrollView>
    );
  }
}

export default NewsDetailScreen;
