import React from 'react';

// DonateDouble (Amply) matching-gifts search, policy-only variant: it shows
// the employer's matching policy and submission instructions, and does not
// process donations itself. Organization ID 11113 is Helping All Little
// Things. The widget renders its employer search box into the container.
export default function AmplyMatchWidget() {
  React.useEffect(() => {
    const init = () => {
      if (window.initAmplyWidget) {
        window.initAmplyWidget({
          submit_type: 'policy',
          organization_id: '11113',
          field_id: {company_name: 'amplyCompanySearch'},
        });
      }
    };
    if (window.initAmplyWidget) {
      init();
      return;
    }
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://giveamply.com/assets/js/standalone.js';
    script.onload = init;
    document.body.appendChild(script);
  }, []);

  return <div id="amplyEmbed" />;
}
