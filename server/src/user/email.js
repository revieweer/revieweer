import ses from 'node-ses';
import config from '../config';

const AWS_KEY= config.aws.accessKeyId;
const AWS_SECRET=config.aws.secretKey;
const AWS_SES_SENDER='team@revieweer.com';

var SESserver = ses.createClient({
  key: AWS_KEY,
  secret: AWS_SECRET
})

const Email = {
  send: (obj) => {
    return new Promise((resolve, reject) => {
      SESserver.sendEmail({
        from: AWS_SES_SENDER, 
        ...obj
      },(err, data) => {
        if (err) return reject(err);
        // Error { 
        //  Type: 'Sender',
        //  Code: 'MessageRejected',
        //  Message: 'Email address is not verified. The following identities failed the check in region US-EAST-1: amazingandyyy@gmail.com' 
        // }
        
        // Good 
        // <SendEmailResponse xmlns="http://ses.amazonaws.com/doc/2010-12-01/">
        //   <SendEmailResult>
        //     <MessageId>0100016193380f61-95eef9bc-018c-49dd-8fd0-18e46455a347-000000</MessageId>
        //   </SendEmailResult>
        //   <ResponseMetadata>
        //     <RequestId>d1584fef-1158-11e8-962a-15378f5aaf10</RequestId>
        //   </ResponseMetadata>
        // </SendEmailResponse>
        resolve(obj.to);
      })
    })
  }
}

export default Email;


// const mailObj = {
//   to: 'amazingandyyy@gmail.com',
//   subject: '[Revieweer]Welcome and Account Activation.',
//   message: `<b>Welcome to join Revieweer,</b> <br/><br/><br/>
//   Please click <a href='${'deepLink'}' target='_blank'>here</a> to your activate your account.
//   <br/>
//   Enjoy of being a revieweer:
//   <br/>
//   <ul>
//     <li>Explore: explore new products to try.</li>
//     <li>Review: amazing review with photo to help business grow</li>
//     <li>Earn: we pay you up to 100% cashback + cash rewards</li>
//   </ul>
//   <br/>
//   The best, Revieweer Team.`
// };
// SES.send(mailObj).then(email=>{
//   console.log(email)
// }).catch(err=>{
//   console.log(err);
// });
