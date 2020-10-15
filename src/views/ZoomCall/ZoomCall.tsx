import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,  
} from '@material-ui/core';
import { Theme } from "@material-ui/core/styles";
import { makeStyles } from '@material-ui/styles';
import ZoomForm from './ZoomForm';
import { ZoomMtg } from "@zoomus/websdk";

const API_KEY = 'uGDLGvtkS5C2EyenG_cRKQ';
const API_SECRET = 'EI6wsld7aaZyANiADT9QgsXnI7t6vQB1iOlT';

(document.getElementById('zmmtg-root') as HTMLInputElement).style.display = 'none';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(4)
  }
}));

type Inputs = {
  meeting: string,
  password: string,
  role: string
};

const ZoomCall = (props: any) => {
  const classes = useStyles();
  const [isFormSubmit, setFormSubmit] = useState(false);
  
  const initialSetup = async () => {
    // CDN
    await ZoomMtg.setZoomJSLib('https://dmogdx0jrul3u.cloudfront.net/1.8.0/lib', '/av');
    await ZoomMtg.preLoadWasm();
    await ZoomMtg.prepareJssdk();

    console.log('checkSystemRequirements Below');
    console.log(JSON.stringify(ZoomMtg.checkSystemRequirements()));
  };

  useEffect(() => {
    initialSetup();
  }, []);

  const zoomFormData = (data: Inputs) => {
    const { meeting, password, role = 0 } = data;
    if (meeting && password) {
      setFormSubmit(true);
      const meetingConfig = {
        mn: meeting, // '77721163149',
        pwd: password, // 'dE1HNngrbEpBemwzREJndkxkRHlRdz09',
        role: role,
        email: "",
        lang: "en",
        signature: '',
        userName: 'Mack',
        apiKey: API_KEY
      };
      const signature = ZoomMtg.generateSignature({
        meetingNumber: meetingConfig.mn,
        apiKey: API_KEY,
        apiSecret: API_SECRET,
        role: meetingConfig.role,
        success: function (res) {
          console.log(' Signature: ', res.result);
          console.log(res.result);
          setTimeout(async () => {
            console.log('HERE Now calling joinMeeting');
            (document.getElementById('zmmtg-root') as HTMLInputElement).style.display = 'block';
            await joinMeeting(res.result, meetingConfig);
          }, 2000);
        },
      });
    }
  };

  const joinMeeting = (signature, meetingConfig) => {
    console.log(' =================6==================== ');
    ZoomMtg.init({
      debug: true,
      leaveUrl: "http://localhost:3000/zoomCall",
      isSupportAV: true,
      success: function (success) {
        console.log("Init Success >>>>>>>>>>>>> ", success);
        ZoomMtg.join({
          meetingNumber: meetingConfig.mn,
          userName: meetingConfig.userName,
          signature: signature,
          apiKey: meetingConfig.apiKey,
          passWord: meetingConfig.pwd,
          success: (success) => {
            console.log('Zoom Init ---> Success', success);
          },

          error: (error) => {
            console.log('Zoom Init ---> Error',error);
          },
        });
      },
    });
  };

  return (
    <div className={classes.root}>
    <Container maxWidth={false}>
      <Box mt={1}>
        <Grid
            container
            spacing={1}
          >
            {
              !isFormSubmit
              && <Grid
                  item
                  lg={9}
                  md={7}
                  xs={12}
                >
                  <ZoomForm
                    zoomformdata={zoomFormData}
                  />
                </Grid>
            }
        </Grid>
        </Box>
      </Container>
      </div>
  );
};

export default ZoomCall;
