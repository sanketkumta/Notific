import React from 'react';
import styled from 'styled-components';
import { ShoppingBag, Star, Gift, CreditCard, Truck, Tag } from 'lucide-react';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
  padding: 20px;
  color: white;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 40px;
`;

const Title = styled.h1`
  font-size: 32px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

const Subtitle = styled.p`
  font-size: 16px;
  opacity: 0.9;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const CardTitle = styled.h3`
  font-size: 20px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ProductCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 16px;
  margin: 12px 0;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
`;

const ProductHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
`;

const ProductName = styled.div`
  font-weight: bold;
  font-size: 16px;
`;

const ProductPrice = styled.div`
  font-size: 18px;
  color: #ffa502;
  font-weight: bold;
`;

const ProductDescription = styled.div`
  font-size: 14px;
  opacity: 0.8;
  margin-bottom: 8px;
`;

const DiscountBadge = styled.span`
  background: #ff4757;
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
  margin-left: 8px;
`;

const Button = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  margin: 8px 8px 8px 0;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }
`;

const AddToCartButton = styled(Button)`
  background: linear-gradient(135deg, #2ed573 0%, #1dd1a1 100%);
  border: none;
  font-weight: 600;

  &:hover {
    background: linear-gradient(135deg, #26d764 0%, #20c997 100%);
  }
`;

const CartSummary = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 16px;
  margin: 16px 0;
`;

export function DutyFreeShop() {
  return (
    <Container>
      <Header>
        <Title>
          <ShoppingBag size={40} />
          Duty Free Shop
        </Title>
        <Subtitle>Exclusive inflight shopping experience</Subtitle>
      </Header>

      <Grid>
        <Card>
          <CardTitle>
            <Tag size={24} />
            Flash Sale!
            <DiscountBadge>40% OFF</DiscountBadge>
          </CardTitle>

          <ProductCard>
            <ProductHeader>
              <ProductName>Chanel No. 5 Perfume</ProductName>
              <ProductPrice>$89.99</ProductPrice>
            </ProductHeader>
            <ProductDescription>
              Classic fragrance, 100ml bottle
              <DiscountBadge>40% OFF</DiscountBadge>
            </ProductDescription>
            <div style={{ fontSize: '12px', opacity: 0.7 }}>
              ⭐⭐⭐⭐⭐ (4.8/5) • Limited time offer
            </div>
          </ProductCard>

          <ProductCard>
            <ProductHeader>
              <ProductName>Luxury Watch Collection</ProductName>
              <ProductPrice>$299.99</ProductPrice>
            </ProductHeader>
            <ProductDescription>
              Swiss made, leather strap
              <DiscountBadge>35% OFF</DiscountBadge>
            </ProductDescription>
            <div style={{ fontSize: '12px', opacity: 0.7 }}>
              ⭐⭐⭐⭐ (4.6/5) • Only 3 left!
            </div>
          </ProductCard>

          <Button>View All Flash Sale Items</Button>
        </Card>

        <Card>
          <CardTitle>
            <Gift size={24} />
            Popular Products
          </CardTitle>

          <ProductCard>
            <ProductHeader>
              <ProductName>Premium Chocolate Box</ProductName>
              <ProductPrice>$24.99</ProductPrice>
            </ProductHeader>
            <ProductDescription>
              Assorted Belgian chocolates, 250g
            </ProductDescription>
            <AddToCartButton>Add to Cart</AddToCartButton>
          </ProductCard>

          <ProductCard>
            <ProductHeader>
              <ProductName>Travel Adapter Set</ProductName>
              <ProductPrice>$19.99</ProductPrice>
            </ProductHeader>
            <ProductDescription>
              Universal adapter for 150+ countries
            </ProductDescription>
            <AddToCartButton>Add to Cart</AddToCartButton>
          </ProductCard>

          <ProductCard>
            <ProductHeader>
              <ProductName>Silk Scarf Collection</ProductName>
              <ProductPrice>$49.99</ProductPrice>
            </ProductHeader>
            <ProductDescription>
              100% silk, designer patterns
            </ProductDescription>
            <AddToCartButton>Add to Cart</AddToCartButton>
          </ProductCard>

          <Button>Browse All Products</Button>
        </Card>

        <Card>
          <CardTitle>
            <ShoppingBag size={24} />
            Shopping Cart
          </CardTitle>

          <CartSummary>
            <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>Cart Summary</div>
            <div style={{ fontSize: '14px', lineHeight: '1.6' }}>
              • Premium Chocolate Box - $24.99<br/>
              • Travel Adapter Set - $19.99<br/>
            </div>
            <hr style={{ margin: '12px 0', opacity: 0.3 }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
              <span>Total:</span>
              <span>$44.98</span>
            </div>
          </CartSummary>

          <Button>View Cart</Button>
          <AddToCartButton>Proceed to Checkout</AddToCartButton>
        </Card>

        <Card>
          <CardTitle>
            <CreditCard size={24} />
            Payment & Delivery
          </CardTitle>

          <div style={{ fontSize: '14px', lineHeight: '2', margin: '16px 0' }}>
            <div>💳 Payment Methods:</div>
            <div>• Credit/Debit Cards</div>
            <div>• PayPal</div>
            <div>• Apple Pay / Google Pay</div>
            <div>• Airline Miles</div>
          </div>

          <div style={{ marginTop: '16px', fontSize: '14px', lineHeight: '2' }}>
            <div>📦 Delivery Options:</div>
            <div>• Seat delivery (within 30 mins)</div>
            <div>• Home delivery (2-5 days)</div>
            <div>• Airport pickup at destination</div>
          </div>

          <Button>Payment Options</Button>
          <Button>Delivery Info</Button>
        </Card>

        <Card>
          <CardTitle>
            <Star size={24} />
            Categories
          </CardTitle>

          <div style={{ fontSize: '16px', lineHeight: '2.5' }}>
            <div>🌸 Perfumes & Cosmetics</div>
            <div>⌚ Watches & Jewelry</div>
            <div>🍫 Chocolates & Confectionery</div>
            <div>🥃 Spirits & Wine</div>
            <div>👜 Fashion & Accessories</div>
            <div>🎁 Souvenirs & Gifts</div>
            <div>💻 Electronics & Gadgets</div>
          </div>

          <Button>Browse Categories</Button>
          <Button>Search Products</Button>
        </Card>

        <Card>
          <CardTitle>
            <Truck size={24} />
            Customer Support
          </CardTitle>

          <div style={{ fontSize: '14px', lineHeight: '2', margin: '16px 0' }}>
            <div>📞 Call button for assistance</div>
            <div>💬 Live chat support</div>
            <div>📧 Email support</div>
            <div>🔄 Easy returns & exchanges</div>
            <div>🛡️ Secure payment guarantee</div>
          </div>

          <div style={{ marginTop: '16px', fontSize: '13px', opacity: 0.8 }}>
            Free delivery on orders over $50. Returns accepted within 30 days.
          </div>

          <Button>Contact Support</Button>
          <Button>Order Tracking</Button>
          <Button>Return Policy</Button>
        </Card>
      </Grid>
    </Container>
  );
}