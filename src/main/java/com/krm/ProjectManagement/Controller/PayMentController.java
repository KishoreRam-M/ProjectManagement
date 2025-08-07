package com.krm.ProjectManagement.Controller;

import com.krm.ProjectManagement.Model.PlanType;
import com.krm.ProjectManagement.Model.Response.PaymentLinkResponse;
import com.krm.ProjectManagement.Model.User;
import com.krm.ProjectManagement.Service.UserService;
import com.razorpay.PaymentLink;
import com.razorpay.RazorpayClient;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payment")
public class PayMentController {

    private final String apiKey = "your_api_key";
    private final String apiSecret = "your_api_secret";

    @Autowired
    private UserService userService;

    @PostMapping("/{planType}")
    public ResponseEntity<PaymentLinkResponse> createPaymentLink(
            @PathVariable PlanType planType,
            @RequestHeader("Authorization") String jwt) {

        try {
            User user = userService.findUserProfileByJwt(jwt);

            int amount = 799 + 100;
            if (planType.equals(PlanType.ANNUALLY)) {
                amount = amount * 12;
                amount = (int) (amount * 0.7); // 30% discount
            }

            RazorpayClient razorpayClient = new RazorpayClient(apiKey, apiSecret);

            JSONObject paymentLinkRequest = new JSONObject();
            paymentLinkRequest.put("amount", amount * 100); // Razorpay uses paise
            paymentLinkRequest.put("currency", "INR");

            JSONObject customer = new JSONObject();
            customer.put("name", user.getName());
            customer.put("email", user.getEmail());
            paymentLinkRequest.put("customer", customer);

            JSONObject notify = new JSONObject();
            notify.put("email", true);
            paymentLinkRequest.put("notify", notify);

            paymentLinkRequest.put("callback_url",
                    "http://localhost:5173/upgrade_plan/success?planType=" + planType);

            PaymentLink payment = razorpayClient.paymentLink.create(paymentLinkRequest);

            String paymentLinkId = payment.get("id");
            String paymentLinkUrl = payment.get("short_url");

            PaymentLinkResponse response = new PaymentLinkResponse(paymentLinkId, paymentLinkUrl);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }
}
