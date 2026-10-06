/* Midtrans tiruan untuk pengujian lokal (tanpa uang sungguhan).
   POST /snap/v1/transactions, GET /v2/:id/status, POST /_mock/set/:id/:status, GET /snap/snap.js */
'use strict';
const http = require('http');

function start(port) {
  const orders = {};
  const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const url = new URL(req.url, 'http://x');
    const json = (code, body) => { res.statusCode = code; res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(body)); };
    let raw = '';
    req.on('data', (c) => { raw += c; });
    req.on('end', () => {
      if (req.method === 'POST' && url.pathname === '/snap/v1/transactions') {
        if (!/^Basic /.test(req.headers.authorization || '')) return json(401, { error_messages: ['unauthorized'] });
        const b = JSON.parse(raw);
        const id = b.transaction_details.order_id;
        if (orders[id]) return json(400, { error_messages: ['order_id has already been taken'] });
        orders[id] = { amount: b.transaction_details.gross_amount, status: null, body: b };
        return json(201, { token: 'tok-' + id, redirect_url: 'http://localhost:' + port + '/pay/' + id });
      }
      let m = /^\/v2\/([^/]+)\/status$/.exec(url.pathname);
      if (req.method === 'GET' && m) {
        const o = orders[decodeURIComponent(m[1])];
        if (!o || !o.status) return json(200, { status_code: '404', status_message: "Transaction doesn't exist." });
        return json(200, { status_code: o.status === 'settlement' ? '200' : '201', transaction_status: o.status, gross_amount: (o.paid || o.amount) + '.00', payment_type: 'qris', fraud_status: 'accept' });
      }
      m = /^\/_mock\/set\/([^/]+)\/([a-z_]+)(?:\/(\d+))?$/.exec(url.pathname);
      if (m) {
        const o = orders[decodeURIComponent(m[1])];
        if (!o) return json(404, {});
        o.status = m[2];
        if (m[3]) o.paid = Number(m[3]);
        return json(200, { ok: true });
      }
      if (url.pathname === '/_mock/orders') return json(200, orders);
      if (url.pathname === '/snap/snap.js') {
        res.setHeader('Content-Type', 'text/javascript');
        // Snap tiruan: menandai pesanan "pending" (pembeli memilih QRIS), lalu memanggil onPending.
        return res.end("window.snap={pay:function(t,cb){var id=t.slice(4);fetch('http://localhost:" + port + "/_mock/set/'+encodeURIComponent(id)+'/pending',{method:'POST'}).then(function(){window.__snapOpened=id;cb.onPending&&cb.onPending({});});}};");
      }
      json(404, {});
    });
  });
  return new Promise((r) => server.listen(port, () => r({ server, orders })));
}

module.exports = { start };
if (require.main === module) start(Number(process.env.PORT || 4010)).then(() => console.log('mock midtrans on', process.env.PORT || 4010));
