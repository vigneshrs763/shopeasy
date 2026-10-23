import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Box,
  Check,
  ChevronDown,
  CircleDollarSign,
  ClipboardList,
  Clock3,
  Database,
  Edit3,
  Eye,
  FileText,
  Grid2X2,
  Headphones,
  Heart,
  LayoutDashboard,
  LogOut,
  Menu,
  Minus,
  Monitor,
  MoreHorizontal,
  Package,
  Plus,
  Search,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Star,
  Store,
  Trash2,
  TrendingUp,
  Truck,
  UserRound,
  Users,
  X,
  Zap,
} from 'lucide-react'
import { FormEvent, ReactNode, useMemo, useState } from 'react'
import {
  BrowserRouter,
  Link,
  NavLink,
  Navigate,
  Outlet,
  Route,
  Routes,
  useNavigate,
  useParams,
} from 'react-router-dom'

type Product = {
  id: number
  name: string
  price: number
  stock: number
  category: string
  rating: number
  image: string
  description: string
}

type CartLine = { itemId: number; qty: number }
type Order = {
  id: number
  customerId: number
  date: string
  status: 'Pending' | 'Completed' | 'Cancelled'
  items: CartLine[]
}

const photos = [
  'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1589362281138-e3f7ebe47f1a?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1575318633968-0383e7d07ca0?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1498049860654-af1a5c566876?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1639413665566-2f75adf7b7ca?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1605436247078-f0ef43ee8d5c?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1722159475082-0a2331580de3?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1587522705669-61de54c723bf?auto=format&fit=crop&w=900&q=85',
]

const initialProducts: Product[] = [
  { id: 1, name: 'Wireless Mouse', price: 25, stock: 50, category: 'Accessories', rating: 4.8, image: photos[1], description: 'Precision wireless control with silent clicks and all-day comfort.' },
  { id: 2, name: 'Mechanical Keyboard', price: 75, stock: 20, category: 'Accessories', rating: 4.9, image: photos[5], description: 'Tactile keys, clean acoustics, and a compact work-ready layout.' },
  { id: 3, name: 'HD Monitor', price: 150, stock: 10, category: 'Displays', rating: 4.7, image: photos[4], description: 'A vivid full-HD display with slim bezels for focused work.' },
  { id: 4, name: 'USB-C Cable', price: 10, stock: 100, category: 'Connectivity', rating: 4.6, image: photos[3], description: 'Durable fast-charge cable for your everyday devices.' },
  { id: 5, name: 'Gaming Headset', price: 60, stock: 15, category: 'Audio', rating: 4.8, image: photos[2], description: 'Immersive sound and a clear microphone in a lightweight fit.' },
  { id: 6, name: 'Laptop Stand', price: 30, stock: 25, category: 'Workspace', rating: 4.7, image: photos[0], description: 'Elevate your screen and improve posture with a stable metal stand.' },
  { id: 7, name: 'Webcam 1080p', price: 45, stock: 8, category: 'Cameras', rating: 4.5, image: photos[6], description: 'Crisp video, auto light correction, and an integrated microphone.' },
  { id: 8, name: 'Desk Mat', price: 15, stock: 40, category: 'Workspace', rating: 4.6, image: photos[7], description: 'A smooth, considered foundation for your keyboard and mouse.' },
  { id: 9, name: 'External SSD 1TB', price: 110, stock: 12, category: 'Storage', rating: 4.9, image: photos[3], description: 'Pocket-sized high-speed storage for files and creative projects.' },
  { id: 10, name: 'Bluetooth Speaker', price: 40, stock: 0, category: 'Audio', rating: 4.4, image: photos[2], description: 'Room-filling wireless sound in a simple portable form.' },
]

const customers = [
  { id: 1, name: 'Alice Johnson', email: 'alice@gmail.com', phone: '9876543210', orders: 3, spent: 635 },
  { id: 2, name: 'Bob Smith', email: 'bob@yahoo.com', phone: '9876543211', orders: 2, spent: 95 },
  { id: 3, name: 'Charlie Davis', email: 'charlie@outlook.com', phone: '9876543212', orders: 2, spent: 165 },
  { id: 4, name: 'David Miller', email: 'david@domain.com', phone: '9876543213', orders: 1, spent: 145 },
  { id: 5, name: 'Eve Wilson', email: 'eve@sample.org', phone: '9876543214', orders: 2, spent: 140 },
  { id: 6, name: 'Frank Moore', email: 'frank@test.com', phone: '9876543215', orders: 1, spent: 45 },
  { id: 7, name: 'Grace Lee', email: 'grace@mail.com', phone: '9876543216', orders: 1, spent: 60 },
]

const initialOrders: Order[] = [
  { id: 1001, customerId: 1, date: 'May 23, 2025', status: 'Completed', items: [{ itemId: 3, qty: 1 }, { itemId: 4, qty: 2 }] },
  { id: 1002, customerId: 2, date: 'May 22, 2025', status: 'Completed', items: [{ itemId: 2, qty: 1 }, { itemId: 4, qty: 2 }] },
  { id: 1003, customerId: 1, date: 'May 19, 2025', status: 'Pending', items: [{ itemId: 9, qty: 1 }, { itemId: 6, qty: 1 }] },
  { id: 1004, customerId: 3, date: 'May 18, 2025', status: 'Completed', items: [{ itemId: 3, qty: 1 }, { itemId: 8, qty: 1 }] },
  { id: 1005, customerId: 4, date: 'May 16, 2025', status: 'Completed', items: [{ itemId: 5, qty: 2 }, { itemId: 1, qty: 1 }] },
  { id: 1006, customerId: 5, date: 'May 15, 2025', status: 'Cancelled', items: [{ itemId: 7, qty: 1 }] },
]

const money = (value: number) => `$${value.toFixed(2)}`

type ShopContext = {
  products: Product[]
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>
  cart: CartLine[]
  setCart: React.Dispatch<React.SetStateAction<CartLine[]>>
  orders: Order[]
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>
  addToCart: (id: number, qty?: number) => void
}

let shop: ShopContext
const useShop = () => shop

function App() {
  const [products, setProducts] = useState(initialProducts)
  const [cart, setCart] = useState<CartLine[]>([{ itemId: 1, qty: 1 }, { itemId: 6, qty: 1 }])
  const [orders, setOrders] = useState(initialOrders)
  const addToCart = (id: number, qty = 1) =>
    setCart((lines) => {
      const found = lines.find((line) => line.itemId === id)
      return found
        ? lines.map((line) => (line.itemId === id ? { ...line, qty: line.qty + qty } : line))
        : [...lines, { itemId: id, qty }]
    })
  shop = { products, setProducts, cart, setCart, orders, setOrders, addToCart }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<StoreLayout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<ProductDetail />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="login" element={<AuthPage mode="login" />} />
          <Route path="register" element={<AuthPage mode="register" />} />
          <Route path="my-orders" element={<MyOrders />} />
          <Route path="orders/:id" element={<OrderDetail />} />
        </Route>
        <Route path="admin/login" element={<AdminLogin />} />
        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="customers" element={<Customers />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="purchases" element={<Purchases />} />
          <Route path="reports" element={<Reports />} />
          <Route path="database" element={<DatabasePage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link to="/" className={`logo ${inverse ? 'logo-inverse' : ''}`}>
      <span className="logo-mark"><ShoppingBag size={20} strokeWidth={2.4} /></span>
      <span>Shop<span>Easy</span></span>
    </Link>
  )
}

function StoreLayout() {
  const { cart } = useShop()
  const [open, setOpen] = useState(false)
  return (
    <div className="site">
      <header className="store-header">
        <div className="container nav-row">
          <Logo />
          <button className="icon-button mobile-menu" onClick={() => setOpen(!open)} aria-label="Toggle menu"><Menu size={21} /></button>
          <nav className={open ? 'store-nav is-open' : 'store-nav'}>
            <NavLink to="/" end>Home</NavLink>
            <NavLink to="/products">Products</NavLink>
            <NavLink to="/my-orders">My orders</NavLink>
          </nav>
          <div className="nav-actions">
            <Link to="/products" className="icon-button" aria-label="Search"><Search size={19} /></Link>
            <Link to="/login" className="icon-button" aria-label="Account"><UserRound size={19} /></Link>
            <Link to="/cart" className="cart-button"><ShoppingCart size={19} /><span>Cart</span>{cart.length > 0 && <b>{cart.reduce((a, c) => a + c.qty, 0)}</b>}</Link>
          </div>
        </div>
      </header>
      <main><Outlet /></main>
      <Footer />
    </div>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div><Logo /><p>Thoughtful tech essentials for better work, play, and everything between.</p></div>
        <div><h4>Shop</h4><Link to="/products">All products</Link><Link to="/products?category=Workspace">Workspace</Link><Link to="/my-orders">Track an order</Link></div>
        <div><h4>Company</h4><Link to="/">About us</Link><Link to="/">Contact</Link><Link to="/admin/login">Admin portal</Link></div>
        <div><h4>Stay in the loop</h4><p>Get product news and thoughtful offers.</p><div className="footer-input"><input placeholder="Email address" /><button aria-label="Subscribe"><ArrowRight size={17} /></button></div></div>
      </div>
      <div className="container footer-bottom"><span>© 2025 ShopEasy. College DBMS project.</span><span>Privacy · Terms</span></div>
    </footer>
  )
}

function PageHeader({ eyebrow, title, description, action }: { eyebrow?: string; title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="page-header">
      <div>{eyebrow && <span className="eyebrow">{eyebrow}</span>}<h1>{title}</h1>{description && <p>{description}</p>}</div>
      {action}
    </div>
  )
}

function Home() {
  const { products, addToCart } = useShop()
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow"><Sparkles size={14} /> New essentials for your setup</span>
            <h1>Better tools.<br /><em>Brighter ideas.</em></h1>
            <p>Upgrade the everyday with carefully chosen technology that makes work smoother and downtime better.</p>
            <div className="button-row">
              <Link to="/products" className="button button-primary">Shop collection <ArrowRight size={17} /></Link>
              <Link to="/products/3" className="button button-secondary">Explore bestsellers</Link>
            </div>
            <div className="hero-proof"><div><strong>4.8</strong><span><Star size={14} fill="currentColor" /> average rating</span></div><i /><div><strong>2.5K+</strong><span>happy customers</span></div></div>
          </div>
          <div className="hero-visual">
            <img src={photos[0]} alt="Clean modern home office workspace" />
            <div className="floating-card"><span className="floating-icon"><Zap size={18} /></span><div><small>Staff pick</small><strong>Build your best setup</strong></div></div>
            <div className="hero-shape" />
          </div>
        </div>
      </section>
      <section className="trust-strip"><div className="container"><div><Truck /><span><strong>Free shipping</strong><small>On orders over $75</small></span></div><div><Check /><span><strong>Quality checked</strong><small>Every product, every time</small></span></div><div><Clock3 /><span><strong>Easy returns</strong><small>30-day return window</small></span></div><div><Headphones /><span><strong>Human support</strong><small>Here when you need us</small></span></div></div></section>
      <section className="section container">
        <PageHeader eyebrow="Popular right now" title="The setup essentials" description="Smart picks our customers keep coming back for." action={<Link className="text-link" to="/products">View all products <ArrowRight size={16} /></Link>} />
        <div className="product-grid">{products.slice(0, 4).map((product) => <ProductCard key={product.id} product={product} onAdd={() => addToCart(product.id)} />)}</div>
      </section>
      <section className="container editorial">
        <img src={photos[6]} alt="A focused workspace with modern technology" />
        <div><span className="eyebrow">Make space for good work</span><h2>Designed around your day.</h2><p>From the first email to the last playlist, our collection brings calm, clarity, and a little more joy to your desk.</p><Link to="/products?category=Workspace" className="button button-light">Shop workspace <ArrowRight size={17} /></Link></div>
      </section>
      <section className="section container">
        <div className="newsletter"><div><span className="eyebrow">A better inbox</span><h2>Good finds, thoughtfully delivered.</h2><p>Join our list for new arrivals, useful guides, and offers worth opening.</p></div><form onSubmit={(e) => e.preventDefault()}><input type="email" placeholder="you@example.com" required /><button className="button button-primary">Join the list</button></form></div>
      </section>
    </>
  )
}

function ProductCard({ product, onAdd }: { product: Product; onAdd: () => void }) {
  const [added, setAdded] = useState(false)
  const add = () => { onAdd(); setAdded(true); setTimeout(() => setAdded(false), 1000) }
  return (
    <article className="product-card">
      <Link to={`/products/${product.id}`} className="product-image"><img src={product.image} alt={product.name} /><span className={product.stock ? 'stock-tag' : 'stock-tag sold'}>{product.stock ? `${product.stock} in stock` : 'Sold out'}</span><button className="heart" aria-label="Save product"><Heart size={17} /></button></Link>
      <div className="product-info"><div className="product-meta"><span>{product.category}</span><span><Star size={13} fill="currentColor" /> {product.rating}</span></div><Link to={`/products/${product.id}`}><h3>{product.name}</h3></Link><div className="product-bottom"><strong>{money(product.price)}</strong><button onClick={add} disabled={!product.stock} className="add-button">{added ? <Check size={17} /> : <ShoppingBag size={17} />}<span>{added ? 'Added' : 'Add'}</span></button></div></div>
    </article>
  )
}

function Products() {
  const { products, addToCart } = useShop()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [sort, setSort] = useState('Featured')
  const categories = ['All', ...new Set(products.map((product) => product.category))]
  const visible = useMemo(() => {
    let result = products.filter((p) => (category === 'All' || p.category === category) && p.name.toLowerCase().includes(query.toLowerCase()))
    if (sort === 'Price: low to high') result = [...result].sort((a, b) => a.price - b.price)
    if (sort === 'Price: high to low') result = [...result].sort((a, b) => b.price - a.price)
    return result
  }, [products, query, category, sort])
  return (
    <section className="section container">
      <PageHeader eyebrow="Shop the collection" title="Products for better days" description="Reliable technology, selected for how you actually live and work." />
      <div className="catalog-tools">
        <label className="search-field"><Search size={18} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by product name..." /></label>
        <label className="select-field">Sort by <select value={sort} onChange={(e) => setSort(e.target.value)}><option>Featured</option><option>Price: low to high</option><option>Price: high to low</option></select><ChevronDown size={16} /></label>
      </div>
      <div className="category-tabs">{categories.map((item) => <button className={category === item ? 'active' : ''} onClick={() => setCategory(item)} key={item}>{item}</button>)}</div>
      <div className="results-row"><span>{visible.length} products</span><span>Live inventory view</span></div>
      <div className="product-grid">{visible.map((product) => <ProductCard key={product.id} product={product} onAdd={() => addToCart(product.id)} />)}</div>
      {!visible.length && <EmptyState icon={<Search />} title="No products found" text="Try a different search or category." />}
    </section>
  )
}

function ProductDetail() {
  const { id } = useParams()
  const { products, addToCart } = useShop()
  const product = products.find((item) => item.id === Number(id))
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  if (!product) return <Navigate to="/products" replace />
  return (
    <section className="section container">
      <Link to="/products" className="back-link"><ArrowLeft size={16} /> Back to products</Link>
      <div className="detail-grid">
        <div className="detail-image"><img src={product.image} alt={product.name} /><span>Photo by Unsplash contributor</span></div>
        <div className="detail-copy"><span className="eyebrow">{product.category} · Item #{String(product.id).padStart(3, '0')}</span><h1>{product.name}</h1><div className="rating"><span><Star size={15} fill="currentColor" /> {product.rating}</span><span>128 reviews</span></div><strong className="detail-price">{money(product.price)}</strong><p>{product.description}</p>
          <div className={product.stock ? 'availability' : 'availability danger'}><span />{product.stock ? `In stock — ${product.stock} available` : 'Currently out of stock'}</div>
          <div className="buy-row"><div className="quantity"><button onClick={() => setQty(Math.max(1, qty - 1))}><Minus size={16} /></button><span>{qty}</span><button onClick={() => setQty(Math.min(product.stock, qty + 1))}><Plus size={16} /></button></div><button disabled={!product.stock} className="button button-primary grow" onClick={() => { addToCart(product.id, qty); setAdded(true) }}>{added ? <><Check size={18} /> Added to cart</> : <><ShoppingBag size={18} /> Add to cart</>}</button></div>
          <div className="detail-benefits"><div><Truck /><span><strong>Fast delivery</strong><small>Ships in 1–2 business days</small></span></div><div><Box /><span><strong>Easy returns</strong><small>30-day hassle-free returns</small></span></div></div>
        </div>
      </div>
    </section>
  )
}

function Cart() {
  const { products, cart, setCart } = useShop()
  const lines = cart.map((line) => ({ ...line, product: products.find((p) => p.id === line.itemId)! })).filter((line) => line.product)
  const subtotal = lines.reduce((sum, line) => sum + line.product.price * line.qty, 0)
  const update = (itemId: number, qty: number) => setCart((current) => current.map((line) => line.itemId === itemId ? { ...line, qty: Math.max(1, qty) } : line))
  return (
    <section className="section container">
      <PageHeader eyebrow="Your bag" title="Shopping cart" description={`${cart.reduce((a, c) => a + c.qty, 0)} items reserved for you.`} />
      {!lines.length ? <EmptyState icon={<ShoppingCart />} title="Your cart is empty" text="Explore our collection and find something useful." action={<Link to="/products" className="button button-primary">Shop products</Link>} /> :
      <div className="cart-layout"><div className="cart-list">{lines.map(({ product, qty }) => <article className="cart-line" key={product.id}><img src={product.image} alt={product.name} /><div className="cart-line-main"><div><small>{product.category} · Item #{product.id}</small><Link to={`/products/${product.id}`}><h3>{product.name}</h3></Link><span>{money(product.price)} each</span></div><div className="cart-line-actions"><div className="quantity"><button onClick={() => update(product.id, qty - 1)}><Minus size={15} /></button><span>{qty}</span><button onClick={() => update(product.id, qty + 1)}><Plus size={15} /></button></div><strong>{money(product.price * qty)}</strong><button className="remove" onClick={() => setCart((current) => current.filter((l) => l.itemId !== product.id))}><Trash2 size={17} /></button></div></div></article>)}</div><OrderSummary subtotal={subtotal} /></div>}
    </section>
  )
}

function OrderSummary({ subtotal }: { subtotal: number }) {
  const shipping = subtotal >= 75 ? 0 : 8
  return <aside className="order-summary"><h3>Order summary</h3><div><span>Subtotal</span><strong>{money(subtotal)}</strong></div><div><span>Shipping</span><strong>{shipping ? money(shipping) : 'Free'}</strong></div><div><span>Estimated tax</span><strong>{money(subtotal * .08)}</strong></div><hr /><div className="summary-total"><span>Total</span><strong>{money(subtotal + shipping + subtotal * .08)}</strong></div><Link to="/checkout" className="button button-primary full">Proceed to checkout <ArrowRight size={17} /></Link><Link to="/products" className="continue-link">Continue shopping</Link><p><Check size={14} /> Secure checkout · 30-day returns</p></aside>
}

function Checkout() {
  const navigate = useNavigate()
  const { products, cart, setCart, orders, setOrders, setProducts } = useShop()
  const subtotal = cart.reduce((sum, line) => sum + (products.find((p) => p.id === line.itemId)?.price || 0) * line.qty, 0)
  const submit = (e: FormEvent) => {
    e.preventDefault()
    const id = 1000 + orders.length + 1
    setOrders([{ id, customerId: 1, date: 'Today', status: 'Completed', items: cart }, ...orders])
    setProducts((current) => current.map((p) => ({ ...p, stock: p.stock - (cart.find((l) => l.itemId === p.id)?.qty || 0) })))
    setCart([])
    navigate(`/orders/${id}`)
  }
  if (!cart.length) return <Navigate to="/cart" replace />
  return (
    <section className="section narrow">
      <PageHeader eyebrow="Secure checkout" title="Almost there" description="Complete your details to place the order." />
      <form className="checkout-layout" onSubmit={submit}><div className="form-stack"><FormSection number="1" title="Contact information"><div className="form-grid"><Field label="Email address"><input type="email" defaultValue="alice@gmail.com" required /></Field><Field label="Phone number"><input defaultValue="9876543210" pattern="[0-9]{10}" required /></Field></div></FormSection><FormSection number="2" title="Delivery address"><div className="form-grid"><Field label="Full name"><input defaultValue="Alice Johnson" required /></Field><Field label="Address"><input placeholder="Street and house number" required /></Field><Field label="City"><input placeholder="Bengaluru" required /></Field><Field label="Postal code"><input placeholder="560001" required /></Field></div></FormSection><FormSection number="3" title="Payment"><div className="payment-demo"><Check size={18} /><span><strong>Cash on delivery</strong><small>Demo checkout — no real payment is collected.</small></span></div></FormSection></div><aside className="order-summary"><h3>Your order</h3>{cart.map((line) => { const p = products.find((item) => item.id === line.itemId)!; return <div className="mini-line" key={line.itemId}><img src={p.image} alt="" /><span>{p.name}<small>Qty {line.qty}</small></span><strong>{money(p.price * line.qty)}</strong></div> })}<hr /><div><span>Subtotal</span><strong>{money(subtotal)}</strong></div><div><span>Shipping</span><strong>{subtotal >= 75 ? 'Free' : '$8.00'}</strong></div><div className="summary-total"><span>Total</span><strong>{money(subtotal + (subtotal >= 75 ? 0 : 8) + subtotal * .08)}</strong></div><button className="button button-primary full">Place order <ArrowRight size={17} /></button></aside></form>
    </section>
  )
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return <label className="field"><span>{label}</span>{children}</label>
}

function FormSection({ number, title, children }: { number: string; title: string; children: ReactNode }) {
  return <section className="form-section"><h3><span>{number}</span>{title}</h3>{children}</section>
}

function AuthPage({ mode }: { mode: 'login' | 'register' }) {
  const navigate = useNavigate()
  const register = mode === 'register'
  return (
    <section className="auth-page">
      <div className="auth-visual"><img src={photos[1]} alt="Calm modern workspace" /><div><span className="eyebrow">Welcome to ShopEasy</span><h2>Everything you need for a better setup.</h2><p>Save your cart, track orders, and keep your favorite technology close.</p></div></div>
      <div className="auth-form"><div className="auth-card"><Logo /><span className="eyebrow">{register ? 'Create an account' : 'Welcome back'}</span><h1>{register ? 'Let’s get you started.' : 'Sign in to continue.'}</h1><p>{register ? 'A few details and you’re ready to shop.' : 'Access your orders and saved items.'}</p><form onSubmit={(e) => { e.preventDefault(); navigate('/') }}>
        {register && <Field label="Full name"><input placeholder="Your name" required /></Field>}<Field label="Email address"><input type="email" placeholder="you@example.com" required /></Field>{register && <Field label="Phone number"><input pattern="[0-9]{10}" placeholder="10-digit phone number" required /></Field>}<Field label="Password"><input type="password" placeholder="At least 8 characters" minLength={8} required /></Field>
        {!register && <div className="form-help"><label><input type="checkbox" /> Remember me</label><Link to="/login">Forgot password?</Link></div>}<button className="button button-primary full">{register ? 'Create account' : 'Sign in'} <ArrowRight size={17} /></button>
      </form><p className="auth-switch">{register ? 'Already have an account?' : 'New to ShopEasy?'} <Link to={register ? '/login' : '/register'}>{register ? 'Sign in' : 'Create an account'}</Link></p></div></div>
    </section>
  )
}

function MyOrders() {
  const { orders, products } = useShop()
  const mine = orders.filter((order) => order.customerId === 1)
  return (
    <section className="section container">
      <PageHeader eyebrow="Your account" title="My orders" description="View order details, status, and purchase history." action={<Link to="/products" className="button button-secondary">Continue shopping</Link>} />
      <div className="order-cards">{mine.map((order) => { const total = order.items.reduce((s, l) => s + (products.find((p) => p.id === l.itemId)?.price || 0) * l.qty, 0); return <article className="order-card" key={order.id}><div className="order-card-head"><div><small>Order</small><strong>#{order.id}</strong></div><div><small>Placed</small><strong>{order.date}</strong></div><div><small>Total</small><strong>{money(total)}</strong></div><StatusBadge value={order.status} /></div><div className="order-preview">{order.items.map((line) => { const p = products.find((item) => item.id === line.itemId)!; return <img key={line.itemId} src={p.image} alt={p.name} /> })}<span>{order.items.reduce((a, c) => a + c.qty, 0)} item(s)</span><Link to={`/orders/${order.id}`} className="button button-secondary">View details <ArrowRight size={16} /></Link></div></article> })}</div>
    </section>
  )
}

function OrderDetail() {
  const { id } = useParams()
  const { orders, products } = useShop()
  const order = orders.find((item) => item.id === Number(id))
  if (!order) return <Navigate to="/my-orders" replace />
  const total = order.items.reduce((s, l) => s + (products.find((p) => p.id === l.itemId)?.price || 0) * l.qty, 0)
  return <section className="section narrow"><Link to="/my-orders" className="back-link"><ArrowLeft size={16} /> Back to orders</Link><div className="confirmation"><span className="confirmation-check"><Check size={28} /></span><span className="eyebrow">{order.status === 'Completed' && order.date === 'Today' ? 'Order confirmed' : 'Order details'}</span><h1>Thank you, Alice.</h1><p>Your order <strong>#{order.id}</strong> has been received. We’ll send updates to alice@gmail.com.</p></div><div className="order-detail-card"><div className="order-card-head"><div><small>Order number</small><strong>#{order.id}</strong></div><div><small>Date</small><strong>{order.date}</strong></div><div><small>Status</small><StatusBadge value={order.status} /></div></div><h3>Items purchased</h3>{order.items.map((line) => { const p = products.find((item) => item.id === line.itemId)!; return <div className="detail-line" key={line.itemId}><img src={p.image} alt={p.name} /><span><strong>{p.name}</strong><small>Item #{p.id} · Qty {line.qty}</small></span><strong>{money(p.price * line.qty)}</strong></div> })}<div className="detail-total"><span>Total</span><strong>{money(total + (total >= 75 ? 0 : 8) + total * .08)}</strong></div></div></section>
}

function StatusBadge({ value }: { value: Order['status'] }) {
  return <span className={`status status-${value.toLowerCase()}`}><i />{value}</span>
}

function EmptyState({ icon, title, text, action }: { icon: ReactNode; title: string; text: string; action?: ReactNode }) {
  return <div className="empty"><span>{icon}</span><h2>{title}</h2><p>{text}</p>{action}</div>
}

const adminNav = [
  ['Dashboard', '/admin/dashboard', LayoutDashboard],
  ['Products', '/admin/products', Package],
  ['Inventory', '/admin/inventory', Box],
  ['Customers', '/admin/customers', Users],
  ['Orders', '/admin/orders', ClipboardList],
  ['Purchases', '/admin/purchases', ShoppingBag],
  ['Reports', '/admin/reports', BarChart3],
  ['Database', '/admin/database', Database],
] as const

function AdminLogin() {
  const navigate = useNavigate()
  return <section className="admin-login"><div className="admin-login-brand"><Logo inverse /><div><span className="eyebrow">Management system</span><h1>Clarity for every order, product, and customer.</h1><p>Your ShopEasy operations hub.</p></div><small>shopping_complex · MySQL schema demo</small></div><div className="admin-login-form"><div><span className="admin-symbol"><Store size={24} /></span><h2>Admin sign in</h2><p>Enter your credentials to access the dashboard.</p><form onSubmit={(e) => { e.preventDefault(); navigate('/admin/dashboard') }}><Field label="Email address"><input type="email" defaultValue="admin@shopeasy.com" required /></Field><Field label="Password"><input type="password" defaultValue="password" required /></Field><div className="form-help"><label><input type="checkbox" /> Keep me signed in</label><Link to="/admin/login">Forgot password?</Link></div><button className="button button-primary full">Sign in to dashboard <ArrowRight size={17} /></button></form><Link className="back-link centered" to="/"><ArrowLeft size={16} /> Back to store</Link></div></div></section>
}

function AdminLayout() {
  const [mobile, setMobile] = useState(false)
  return <div className="admin-shell"><aside className={mobile ? 'admin-sidebar open' : 'admin-sidebar'}><div className="admin-logo"><Logo inverse /><button onClick={() => setMobile(false)}><X size={19} /></button></div><div className="workspace-label">Workspace <span>SE</span></div><nav>{adminNav.map(([label, path, Icon]) => <NavLink key={path} to={path}><Icon size={18} />{label}</NavLink>)}</nav><div className="sidebar-profile"><span>AJ</span><div><strong>Admin User</strong><small>Super admin</small></div><MoreHorizontal size={17} /></div><Link className="logout" to="/admin/login"><LogOut size={17} /> Sign out</Link></aside><div className="admin-main"><header className="admin-topbar"><button className="icon-button" onClick={() => setMobile(true)}><Menu size={20} /></button><label className="admin-search"><Search size={17} /><input placeholder="Search anything..." /><kbd>⌘ K</kbd></label><div><button className="icon-button"><Clock3 size={19} /></button><span className="avatar">AJ</span></div></header><main className="admin-content"><Outlet /></main></div></div>
}

function AdminHeader({ eyebrow = 'ShopEasy admin', title, description, action }: { eyebrow?: string; title: string; description: string; action?: ReactNode }) {
  return <PageHeader eyebrow={eyebrow} title={title} description={description} action={action} />
}

function Dashboard() {
  const { products, orders } = useShop()
  const revenue = orders.filter((o) => o.status === 'Completed').reduce((sum, order) => sum + order.items.reduce((s, l) => s + (products.find((p) => p.id === l.itemId)?.price || 0) * l.qty, 0), 0)
  return <><AdminHeader title="Good morning, Alex" description="Here’s what’s happening with your store today." action={<span className="date-chip"><Clock3 size={15} /> May 24, 2025</span>} /><div className="metric-grid"><Metric icon={<CircleDollarSign />} label="Total revenue" value={money(revenue)} delta="+12.5%" tone="blue" /><Metric icon={<ClipboardList />} label="Total orders" value={String(orders.length)} delta="+8.2%" tone="purple" /><Metric icon={<Users />} label="Customers" value={String(customers.length)} delta="+4.1%" tone="green" /><Metric icon={<Package />} label="Products" value={String(products.length)} delta="2 low stock" tone="amber" /></div><div className="dashboard-grid"><div className="panel chart-panel"><PanelHead title="Sales overview" subtitle="Revenue over the last 7 months" action={<select><option>Last 7 months</option></select>} /><BarChart /></div><div className="panel"><PanelHead title="Order status" subtitle="Current order distribution" /><DonutChart orders={orders} /></div></div><div className="dashboard-grid lower"><div className="panel"><PanelHead title="Recent orders" subtitle="Latest customer purchases" action={<Link to="/admin/orders">View all <ArrowRight size={14} /></Link>} /><OrdersTable compact /></div><div className="panel"><PanelHead title="Inventory alerts" subtitle="Products that need attention" action={<Link to="/admin/inventory">Manage <ArrowRight size={14} /></Link>} />{products.filter((p) => p.stock < 15).slice(0, 4).map((p) => <div className="alert-row" key={p.id}><img src={p.image} alt="" /><span><strong>{p.name}</strong><small>SKU #{String(p.id).padStart(4, '0')}</small></span><b className={p.stock ? '' : 'danger-text'}>{p.stock} left</b></div>)}</div></div></>
}

function Metric({ icon, label, value, delta, tone }: { icon: ReactNode; label: string; value: string; delta: string; tone: string }) {
  return <div className="metric"><span className={`metric-icon ${tone}`}>{icon}</span><span className="metric-delta"><TrendingUp size={13} /> {delta}</span><small>{label}</small><strong>{value}</strong></div>
}

function PanelHead({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return <div className="panel-head"><div><h3>{title}</h3>{subtitle && <p>{subtitle}</p>}</div>{action}</div>
}

function BarChart() {
  const bars = [38, 50, 44, 68, 59, 82, 74]
  return <div className="bar-chart"><div className="y-labels"><span>$2K</span><span>$1K</span><span>$0</span></div><div className="bars">{bars.map((height, i) => <div key={i}><span style={{ height: `${height}%` }} /><small>{['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'][i]}</small></div>)}</div></div>
}

function DonutChart({ orders }: { orders: Order[] }) {
  const completed = orders.filter((o) => o.status === 'Completed').length
  return <div className="donut-wrap"><div className="donut"><span><strong>{orders.length}</strong><small>Total orders</small></span></div><div className="donut-legend"><div><i className="dot blue" />Completed <strong>{completed}</strong></div><div><i className="dot amber" />Pending <strong>{orders.filter((o) => o.status === 'Pending').length}</strong></div><div><i className="dot gray" />Cancelled <strong>{orders.filter((o) => o.status === 'Cancelled').length}</strong></div></div></div>
}

function AdminProducts() {
  const { products, setProducts } = useShop()
  const [query, setQuery] = useState('')
  const [showForm, setShowForm] = useState(false)
  const visible = products.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
  const addProduct = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    setProducts((current) => [...current, { id: Math.max(...current.map((p) => p.id)) + 1, name: String(data.get('name')), price: Number(data.get('price')), stock: Number(data.get('stock')), category: String(data.get('category')), rating: 5, image: photos[current.length % photos.length], description: 'A new item in the ShopEasy collection.' }])
    setShowForm(false)
  }
  return <><AdminHeader title="Products" description="Manage your product catalog and pricing." action={<button className="button button-primary" onClick={() => setShowForm(!showForm)}><Plus size={17} /> Add product</button>} />{showForm && <form className="quick-form panel" onSubmit={addProduct}><Field label="Product name"><input name="name" required /></Field><Field label="Category"><input name="category" required /></Field><Field label="Price"><input name="price" type="number" min="1" required /></Field><Field label="Opening stock"><input name="stock" type="number" min="0" required /></Field><button className="button button-primary">Save product</button></form>}<DataToolbar query={query} setQuery={setQuery} placeholder="Search products..." /><div className="panel table-panel"><table><thead><tr><th>Product</th><th>Item ID</th><th>Category</th><th>Price</th><th>Stock</th><th>Status</th><th /></tr></thead><tbody>{visible.map((p) => <tr key={p.id}><td><div className="table-product"><img src={p.image} alt="" /><strong>{p.name}</strong></div></td><td>#{String(p.id).padStart(4, '0')}</td><td>{p.category}</td><td><strong>{money(p.price)}</strong></td><td>{p.stock}</td><td><span className={`inventory-state ${p.stock === 0 ? 'out' : p.stock < 10 ? 'low' : ''}`}>{p.stock === 0 ? 'Out of stock' : p.stock < 10 ? 'Low stock' : 'In stock'}</span></td><td><button className="table-action" onClick={() => setProducts((current) => current.filter((item) => item.id !== p.id))}><Trash2 size={16} /></button></td></tr>)}</tbody></table></div></>
}

function DataToolbar({ query, setQuery, placeholder }: { query: string; setQuery: (value: string) => void; placeholder: string }) {
  return <div className="data-toolbar"><label className="admin-search"><Search size={17} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={placeholder} /></label><button className="button button-secondary"><FileText size={16} /> Export CSV</button></div>
}

function Inventory() {
  const { products, setProducts } = useShop()
  const [query, setQuery] = useState('')
  const update = (id: number, delta: number) => setProducts((current) => current.map((p) => p.id === id ? { ...p, stock: Math.max(0, p.stock + delta) } : p))
  return <><AdminHeader title="Inventory" description="Monitor stock levels and adjust quantities." /><div className="inventory-summary"><div><span className="metric-icon blue"><Box /></span><span><small>Total units</small><strong>{products.reduce((a, p) => a + p.stock, 0)}</strong></span></div><div><span className="metric-icon amber"><Clock3 /></span><span><small>Low stock</small><strong>{products.filter((p) => p.stock > 0 && p.stock < 15).length}</strong></span></div><div><span className="metric-icon red"><X /></span><span><small>Out of stock</small><strong>{products.filter((p) => !p.stock).length}</strong></span></div></div><DataToolbar query={query} setQuery={setQuery} placeholder="Search inventory..." /><div className="panel table-panel"><table><thead><tr><th>Item</th><th>Unit price</th><th>Current stock</th><th>Availability</th><th>Quick adjust</th></tr></thead><tbody>{products.filter((p) => p.name.toLowerCase().includes(query.toLowerCase())).map((p) => <tr key={p.id}><td><div className="table-product"><img src={p.image} alt="" /><span><strong>{p.name}</strong><small>Item #{p.id}</small></span></div></td><td>{money(p.price)}</td><td><strong>{p.stock} units</strong></td><td><span className={`inventory-state ${p.stock === 0 ? 'out' : p.stock < 15 ? 'low' : ''}`}>{p.stock === 0 ? 'Unavailable' : p.stock < 15 ? 'Reorder soon' : 'Healthy'}</span></td><td><div className="stock-adjust"><button onClick={() => update(p.id, -1)}><Minus size={14} /></button><button onClick={() => update(p.id, 1)}><Plus size={14} /></button><button onClick={() => update(p.id, 10)}>+10</button></div></td></tr>)}</tbody></table></div></>
}

function Customers() {
  const [query, setQuery] = useState('')
  return <><AdminHeader title="Customers" description="View customer records and shopping activity." /><DataToolbar query={query} setQuery={setQuery} placeholder="Search customers..." /><div className="panel table-panel"><table><thead><tr><th>Customer</th><th>Customer ID</th><th>Phone</th><th>Orders</th><th>Total spent</th><th /></tr></thead><tbody>{customers.filter((c) => `${c.name}${c.email}`.toLowerCase().includes(query.toLowerCase())).map((c) => <tr key={c.id}><td><div className="customer-cell"><span>{c.name.split(' ').map((n) => n[0]).join('')}</span><div><strong>{c.name}</strong><small>{c.email}</small></div></div></td><td>#{String(c.id).padStart(4, '0')}</td><td>{c.phone}</td><td>{c.orders}</td><td><strong>{money(c.spent)}</strong></td><td><button className="table-action"><Eye size={16} /></button></td></tr>)}</tbody></table></div></>
}

function OrdersTable({ compact = false }: { compact?: boolean }) {
  const { orders, products } = useShop()
  return <div className={compact ? 'compact-table' : 'table-scroll'}><table><thead><tr><th>Order</th><th>Customer</th>{!compact && <th>Date</th>}<th>Total</th><th>Status</th>{!compact && <th />}</tr></thead><tbody>{orders.slice(0, compact ? 5 : undefined).map((o) => { const c = customers.find((item) => item.id === o.customerId); const total = o.items.reduce((s, l) => s + (products.find((p) => p.id === l.itemId)?.price || 0) * l.qty, 0); return <tr key={o.id}><td><strong>#{o.id}</strong></td><td>{c?.name || 'Alice Johnson'}</td>{!compact && <td>{o.date}</td>}<td><strong>{money(total)}</strong></td><td><StatusBadge value={o.status} /></td>{!compact && <td><Link to={`/orders/${o.id}`} className="table-action"><Eye size={16} /></Link></td>}</tr> })}</tbody></table></div>
}

function AdminOrders() {
  const [query, setQuery] = useState('')
  return <><AdminHeader title="Orders" description="Track and manage every customer order." /><DataToolbar query={query} setQuery={setQuery} placeholder="Search order ID or customer..." /><div className="panel table-panel"><OrdersTable /></div></>
}

function Purchases() {
  const { orders, products } = useShop()
  const purchases = orders.filter((o) => o.status === 'Completed').flatMap((o) => o.items.map((l, index) => ({ ...l, purchaseId: `${o.id}${index + 1}`, orderId: o.id, product: products.find((p) => p.id === l.itemId)! })))
  return <><AdminHeader title="Purchased products" description="Fulfilled line items stored in products_purchased." /><div className="panel table-panel"><table><thead><tr><th>Purchase ID</th><th>Order ID</th><th>Product</th><th>Purchased quantity</th><th>Line value</th></tr></thead><tbody>{purchases.map((p) => <tr key={p.purchaseId}><td>#{p.purchaseId}</td><td><strong>#{p.orderId}</strong></td><td><div className="table-product"><img src={p.product.image} alt="" /><strong>{p.product.name}</strong></div></td><td>{p.qty}</td><td><strong>{money(p.qty * p.product.price)}</strong></td></tr>)}</tbody></table></div></>
}

function Reports() {
  const { orders, products } = useShop()
  const values = products.slice(0, 6).map((p) => ({ name: p.name, value: orders.flatMap((o) => o.items).filter((i) => i.itemId === p.id).reduce((a, c) => a + c.qty * p.price, 0) }))
  const max = Math.max(...values.map((v) => v.value), 1)
  return <><AdminHeader title="Sales reports" description="SQL-ready insights into revenue and product performance." action={<button className="button button-secondary"><FileText size={16} /> Download report</button>} /><div className="metric-grid"><Metric icon={<CircleDollarSign />} label="Gross sales" value={money(values.reduce((a, c) => a + c.value, 0))} delta="+12.5%" tone="blue" /><Metric icon={<ShoppingBag />} label="Items sold" value={String(orders.flatMap((o) => o.items).reduce((a, c) => a + c.qty, 0))} delta="+9.4%" tone="green" /><Metric icon={<TrendingUp />} label="Average order" value="$112.40" delta="+3.8%" tone="purple" /><Metric icon={<Users />} label="Repeat rate" value="38%" delta="+2.1%" tone="amber" /></div><div className="dashboard-grid"><div className="panel report-bars"><PanelHead title="Revenue by product" subtitle="Top products across completed orders" />{values.map((v) => <div key={v.name}><span>{v.name}</span><div><i style={{ width: `${(v.value / max) * 100}%` }} /></div><strong>{money(v.value)}</strong></div>)}</div><div className="panel"><PanelHead title="Customer value" subtitle="Calculated from purchased quantities" />{customers.slice(0, 5).map((c, i) => <div className="rank-row" key={c.id}><span>{i + 1}</span><div><strong>{c.name}</strong><small>{c.orders} orders</small></div><b>{money(c.spent)}</b></div>)}</div></div></>
}

function DatabasePage() {
  const tables = [
    ['customer', '3 fields', 'Customer profiles and contact details'],
    ['items_available', '4 fields', 'Product catalog and stock'],
    ['order_list', '4 fields', 'Customer shopping sessions'],
    ['cart_items', '4 fields', 'Desired order line items'],
    ['products_purchased', '4 fields', 'Fulfilled product records'],
  ]
  return <><AdminHeader title="Database explorer" description="Understand the shopping_complex schema and relationships." /><div className="db-banner"><Database size={24} /><div><strong>shopping_complex</strong><span>MySQL · 5 tables · 1 view · 1 procedure · 1 trigger</span></div><span className="connection"><i /> Schema reference</span></div><div className="database-layout"><div className="panel"><PanelHead title="Tables" subtitle="Core relational entities" />{tables.map(([name, fields, desc]) => <div className="db-table-row" key={name}><span><Grid2X2 size={17} /></span><div><strong>{name}</strong><small>{desc}</small></div><b>{fields}</b></div>)}</div><div className="panel relationship-panel"><PanelHead title="Entity relationships" subtitle="Foreign-key structure" /><div className="schema"><SchemaNode name="customer" keyName="PK customer_id" /><ArrowRight /><SchemaNode name="order_list" keyName="FK customer_id" /><div className="schema-split"><span /><div><ArrowRight /><SchemaNode name="cart_items" keyName="FK order_id · item_id" /></div><div><ArrowRight /><SchemaNode name="products_purchased" keyName="FK order_id · item_id" /></div></div><SchemaNode name="items_available" keyName="PK item_id" /></div></div></div><div className="db-objects"><div className="panel"><span className="metric-icon purple"><Eye /></span><h3>view_available_inventory</h3><p>Shows products with stock greater than zero.</p><code>WHERE stock_qty &gt; 0</code></div><div className="panel"><span className="metric-icon blue"><Zap /></span><h3>ProcessOrderCheckout</h3><p>Moves available cart lines into purchases.</p><code>IN p_order_id INT</code></div><div className="panel"><span className="metric-icon amber"><Edit3 /></span><h3>trg_after_product_purchased</h3><p>Deducts purchased quantities from stock.</p><code>AFTER INSERT</code></div></div></>
}

function SchemaNode({ name, keyName }: { name: string; keyName: string }) {
  return <div className="schema-node"><strong>{name}</strong><small>{keyName}</small></div>
}

export default App
