import React from 'react';

// DonateDouble (Amply) matching-gifts search, policy-only variant: it shows
// the employer's matching policy and submission instructions, and does not
// process donations itself. Organization ID 11113 is Helping All Little
// Things. The widget renders its employer search box into the container.
//
// Integration note: standalone.js only defines window.loadAmplyWidget,
// which in turn loads the widget bundle and calls initAmplyWidget with
// these options. Calling initAmplyWidget directly (as the printed guide
// snippet suggests) does nothing, because that function does not exist
// until the loader has run. This mirrors Amply's own live example page.
const WIDGET_OPTIONS = {
  retry: true,
  instant_match: true,
  submit_type: 'policy',
  enable_direct_donation: false,
  field_id: {
    donor_name: 'donor_name',
    donor_email: 'donor_email',
    amount: 'amount',
  },
  organization_id: 11113,
};

export default function AmplyMatchWidget() {
  React.useEffect(() => {
    const start = () => {
      if (window.loadAmplyWidget) {
        window.loadAmplyWidget(WIDGET_OPTIONS);
      }
    };
    if (window.loadAmplyWidget) {
      start();
      return;
    }
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://giveamply.com/assets/js/standalone.js';
    script.onload = start;
    document.body.appendChild(script);
  }, []);

  return <div id="amplyEmbed" />;
}
