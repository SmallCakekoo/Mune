import {
    IconPalette,
    IconTypography,
    IconBoxMargin,
    IconLayoutGrid,
    IconIcons,
    IconCircleHalf,
    IconBorderAll,
    IconMaximize,
    IconMouse,
    IconBrandTabler,
    IconStar,
    IconHeart,
    IconBell,
    IconSettings,
    IconUser,
    IconHome,
    IconSearch,
    IconPlus,
    IconTrash,
    IconEdit,
    IconLoader,
    IconComponents,
    IconAppWindow,
    IconForms,
} from '@tabler/icons-react';
import { useTheme } from '../../context/ThemeContext';
import { useState } from 'react';
import { Button } from '../../components/common/Button/Button';
import { Input } from '../../components/common/Input/Input';
import { Checkbox } from '../../components/common/Checkbox/Checkbox';
import { Loader } from '../../components/common/Loader/Loader';
import Modal from '../../components/common/Modal/Modal';
import ConfirmationDialog from '../../components/common/ConfirmationDialog/ConfirmationDialog';
import MuneLogo from '../../assets/images/MuneExpanded.svg';

const SECTION_ICON_SIZE = 24;

const DesignSystem = () => {
    const { theme: activeTheme, setTheme } = useTheme();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const themes = [
        { id: 'purple', color: '#8B5CF6', name: 'Purple' },
        { id: 'blue', color: '#3B82F6', name: 'Blue' },
        { id: 'cyan', color: '#06B6D4', name: 'Cyan' },
        { id: 'green', color: '#10B981', name: 'Green' },
        { id: 'red', color: '#EF4444', name: 'Red' },
    ] as const;

    const typography = {
        display: [
            { name: 'Display 1', size: 'text-7xl', font: 'font-display' },
            { name: 'Display 2', size: 'text-5xl', font: 'font-display' },
        ],
        headings: [
            { name: 'Heading 1', size: 'text-4xl', font: 'font-display' },
            { name: 'Heading 2', size: 'text-3xl', font: 'font-display' },
            { name: 'Heading 3', size: 'text-2xl', font: 'font-display' },
            { name: 'Heading 4', size: 'text-xl', font: 'font-display' },
        ],
        body: [
            { name: 'Body Large', size: 'text-lg', font: 'font-sans' },
            { name: 'Body Default', size: 'text-base', font: 'font-sans' },
            { name: 'Body Small', size: 'text-sm', font: 'font-sans' },
            { name: 'Caption', size: 'text-xs', font: 'font-sans' },
        ]
    };

    const icons = [
        IconHome, IconSearch, IconPlus, IconTrash, IconEdit,
        IconSettings, IconUser, IconBell, IconHeart, IconStar,
        IconPalette, IconTypography, IconLayoutGrid, IconIcons,
        IconCircleHalf, IconBorderAll, IconMaximize, IconMouse
    ];

    const radii = ['rounded-none', 'rounded-sm', 'rounded', 'rounded-md', 'rounded-lg', 'rounded-xl', 'rounded-2xl', 'rounded-3xl', 'rounded-full'];
    const spacings = [
        { name: '0', value: '0px' },
        { name: '1', value: '4px' },
        { name: '2', value: '8px' },
        { name: '4', value: '16px' },
        { name: '6', value: '24px' },
        { name: '8', value: '32px' },
        { name: '12', value: '48px' },
        { name: '16', value: '64px' },
    ];

    return (
        <div className="min-h-screen bg-background-500 text-white font-sans p-8 md:p-16">
            <header className="max-w-7xl mx-auto mb-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-b border-white/10 pb-12">
                <div>
                    <h1 className="text-5xl font-bold font-display mb-4">Design System</h1>
                    <p className="text-neutral-5 text-xl">Visual language and core components for Mune.</p>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <span className="text-sm font-medium text-neutral-5 uppercase tracking-wider">Active Theme</span>
                        <p className="text-xs text-neutral-100">Changes the global primary color palette.</p>
                    </div>
                    <div className="flex gap-3">
                        {themes.map(t => (
                            <button
                                key={t.id}
                                onClick={() => setTheme(t.id)}
                                className={`w-10 h-10 rounded-full border-2 transition-all cursor-pointer flex items-center justify-center ${activeTheme === t.id ? 'border-white scale-110 shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'}`}
                                style={{ backgroundColor: t.color }}
                                title={t.name}
                            />
                        ))}
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto space-y-24">

                {/* Logo */}
                <section>
                    <SectionTitle icon={IconBrandTabler} title="Logo" />
                    <div className="bg-background-400 p-12 rounded-2xl border border-white/10 flex items-center justify-center">
                        <img src={MuneLogo} alt="Mune Logo" className="h-16 w-auto" />
                    </div>
                </section>

                {/* Color Palette */}
                <section>
                    <SectionTitle icon={IconPalette} title="Color Palette" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        <ColorGroup
                            title="Primary (Themed)"
                            colors={['bg-primary-100', 'bg-primary-200', 'bg-primary-300', 'bg-primary-400', 'bg-primary-500', 'bg-primary-600']}
                            labels={['Primary 100', 'Primary 200', 'Primary 300', 'Primary 400', 'Primary 500', 'Primary 600']}
                        />
                        <ColorGroup
                            title="Background"
                            colors={['bg-background-100', 'bg-background-200', 'bg-background-300', 'bg-background-400', 'bg-background-500']}
                            labels={['Background 100', 'Background 200', 'Background 300', 'Background 400', 'Background 500']}
                        />
                        <ColorGroup
                            title="Neutral"
                            colors={['bg-neutral-5', 'bg-neutral-100', 'bg-neutral-200', 'bg-neutral-300', 'bg-neutral-400', 'bg-neutral-500']}
                            labels={['Neutral 5', 'Neutral 100', 'Neutral 200', 'Neutral 300', 'Neutral 400', 'Neutral 500']}
                        />
                        <ColorGroup
                            title="Semantic"
                            colors={['bg-success-500', 'bg-error-500', 'bg-warning-500']}
                            labels={['Success', 'Error', 'Warning']}
                        />
                    </div>
                </section>

                {/* Typography */}
                <section>
                    <SectionTitle icon={IconTypography} title="Typography" />
                    <div className="space-y-12">
                        <div>
                            <h3 className="text-sm font-medium text-neutral-5 uppercase tracking-wider mb-6">Typefaces</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="p-8 bg-background-400 rounded-xl border border-white/10">
                                    <p className="text-4xl font-display mb-2">Pally</p>
                                    <p className="text-neutral-5">Used for headings and display text. Bold, friendly, and geometric.</p>
                                </div>
                                <div className="p-8 bg-background-400 rounded-xl border border-white/10">
                                    <p className="text-4xl font-sans mb-2">Outfit</p>
                                    <p className="text-neutral-5">Used for body text and UI elements. Clean, modern, and highly legible.</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium text-neutral-5 uppercase tracking-wider mb-6">Hierarchy</h3>
                            <div className="space-y-8 bg-background-400 p-8 md:p-12 rounded-2xl border border-white/10">
                                {Object.entries(typography).map(([group, items]) => (
                                    <div key={group} className="space-y-6">
                                        <p className="text-xs font-bold text-primary-400 uppercase tracking-widest">{group}</p>
                                        {items.map((item) => (
                                            <div key={item.name} className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8">
                                                <span className="text-white text-sm font-mono w-32 shrink-0">{item.size}</span>
                                                <span className={`${item.font} ${item.size} leading-tight`}>{item.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Iconography */}
                <section>
                    <SectionTitle icon={IconIcons} title="Iconography" />
                    <div className="bg-background-400 p-8 md:p-12 rounded-2xl border border-white/10">
                        <p className="text-neutral-5 mb-8">Using <span className="text-white font-medium">@tabler/icons-react</span> for a consistent, stroke-based icon language.</p>
                        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-6">
                            {icons.map((Icon, i) => (
                                <div key={i} className="flex flex-col items-center gap-2">
                                    <div className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-lg border border-white/10 text-primary-400">
                                        <Icon size={24} />
                                    </div>
                                    <span className="text-[10px] text-white text-center font-mono opacity-60 lowercase">{Icon.name?.replace('Icon', '')}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Grid & Spacing */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
                    <section>
                        <SectionTitle icon={IconLayoutGrid} title="Grid System" />
                        <div className="bg-background-400 p-8 rounded-2xl border border-white/10 space-y-6">
                            <div className="grid grid-cols-4 gap-4">
                                {[1, 2, 3, 4].map(i => <div key={i} className="h-16 bg-primary-500/20 border border-primary-500/30 rounded flex items-center justify-center text-primary-300 font-mono text-xs">COL</div>)}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                {[1, 2].map(i => <div key={i} className="h-16 bg-primary-500/20 border border-primary-500/30 rounded flex items-center justify-center text-primary-300 font-mono text-xs">COL</div>)}
                            </div>
                            <div className="h-16 bg-primary-500/20 border border-primary-500/30 rounded flex items-center justify-center text-primary-300 font-mono text-xs">FULL WIDTH</div>
                        </div>
                    </section>

                    <section>
                        <SectionTitle icon={IconBoxMargin} title="Spacing" />
                        <div className="bg-background-400 p-8 rounded-2xl border border-white/10 space-y-4">
                            {spacings.map(s => (
                                <div key={s.name} className="flex items-center gap-6">
                                    <span className="w-8 text-white font-mono text-xs">p-{s.name}</span>
                                    <div className="bg-secondary-cyan-500/30 h-4 border-x border-secondary-cyan-500" style={{ width: s.value }} />
                                    <span className="text-white text-xs opacity-80">{s.value}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Effects */}
                <section>
                    <SectionTitle icon={IconCircleHalf} title="Radius, Stroke & Shadows" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="space-y-6">
                            <h3 className="text-sm font-medium text-neutral-5 uppercase tracking-wider">Border Radius</h3>
                            <div className="grid grid-cols-3 gap-4">
                                {radii.slice(4).map(r => (
                                    <div key={r} className="flex flex-col gap-2">
                                        <div className={`w-full aspect-square bg-white/10 border border-white/20 ${r}`} />
                                        <span className="text-[10px] text-white font-mono text-center">{r}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-sm font-medium text-neutral-5 uppercase tracking-wider">Stroke</h3>
                            <div className="space-y-4">
                                <div className="p-4 bg-background-300 border border-white/10 rounded-xl">
                                    <span className="text-xs font-mono text-white">border-white/10</span>
                                </div>
                                <div className="p-4 bg-background-300 border border-white/5 rounded-xl">
                                    <span className="text-xs font-mono text-white">border-white/5</span>
                                </div>
                                <div className="p-4 bg-background-300 border-2 border-primary-500/30 rounded-xl">
                                    <span className="text-xs font-mono text-white">border-2 border-primary-500/30</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-sm font-medium text-neutral-5 uppercase tracking-wider">Shadows & Glows</h3>
                            <div className="space-y-6">
                                <div className="h-12 bg-primary-500 rounded-xl shadow-[0_0_30px_rgba(58,139,255,0.4)] flex items-center justify-center">
                                    <span className="text-xs font-bold uppercase tracking-widest">Global Glow</span>
                                </div>
                                <div className="h-12 bg-background-300 rounded-xl shadow-2xl flex items-center justify-center border border-white/5">
                                    <span className="text-xs font-bold uppercase tracking-widest opacity-50">Deep Shadow</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* UI Kit */}
                <section className="pt-16 border-t border-white/10">
                    <SectionTitle icon={IconComponents} title="UI Kit" />

                    <div className="space-y-24">
                        {/* Buttons */}
                        <div className="space-y-12">
                            <div className="flex items-center gap-3">
                                <IconMouse size={20} className="text-secondary-cyan-500" />
                                <h3 className="text-sm font-medium text-neutral-5 uppercase tracking-wider">Buttons</h3>
                            </div>
                            <div className="bg-background-400 p-8 md:p-12 rounded-2xl border border-white/10 space-y-12">
                                <div className="space-y-6">
                                    <h4 className="text-xs font-bold text-primary-400 uppercase tracking-widest">Variants</h4>
                                    <div className="flex flex-wrap gap-4">
                                        <Button variant="primary">Primary Button</Button>
                                        <Button variant="secondary">Secondary Button</Button>
                                        <Button variant="outline">Outline Button</Button>
                                        <Button variant="ghost">Ghost Button</Button>
                                        <Button variant="link">Link Button</Button>
                                        <Button variant="social">Social Button</Button>
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <h4 className="text-xs font-bold text-primary-400 uppercase tracking-widest">Sizes</h4>
                                    <div className="flex flex-wrap items-center gap-6">
                                        <div className="flex flex-col gap-2 items-center">
                                            <Button size="sm">Small</Button>
                                            <span className="text-[10px] font-mono opacity-40">sm</span>
                                        </div>
                                        <div className="flex flex-col gap-2 items-center">
                                            <Button size="default">Default</Button>
                                            <span className="text-[10px] font-mono opacity-40">default</span>
                                        </div>
                                        <div className="flex flex-col gap-2 items-center">
                                            <Button size="lg">Large</Button>
                                            <span className="text-[10px] font-mono opacity-40">lg</span>
                                        </div>
                                        <div className="flex flex-col gap-2 items-center">
                                            <Button size="icon"><IconPlus size={20} /></Button>
                                            <span className="text-[10px] font-mono opacity-40">icon</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <h4 className="text-xs font-bold text-primary-400 uppercase tracking-widest">States</h4>
                                    <div className="flex flex-wrap gap-4">
                                        <Button isLoading>Loading State</Button>
                                        <Button disabled>Disabled State</Button>
                                        <Button fullWidth>Full Width Button</Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Forms */}
                        <div className="space-y-12">
                            <div className="flex items-center gap-3">
                                <IconForms size={20} className="text-secondary-cyan-500" />
                                <h3 className="text-sm font-medium text-neutral-5 uppercase tracking-wider">Forms & Inputs</h3>
                            </div>
                            <div className="bg-background-400 p-8 md:p-12 rounded-2xl border border-white/10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                    <div className="space-y-8">
                                        <h4 className="text-xs font-bold text-primary-400 uppercase tracking-widest">Input States</h4>
                                        <Input placeholder="Default input" />
                                        <Input label="With Label" placeholder="Enter something..." />
                                        <Input label="With Helper Text" helperText="This is a useful hint." placeholder="Focus me..." />
                                        <Input label="Error State" error="This field is required" defaultValue="Invalid value" />
                                        <Input type="password" label="Password Input" defaultValue="password123" />
                                    </div>
                                    <div className="space-y-8">
                                        <h4 className="text-xs font-bold text-primary-400 uppercase tracking-widest">Checkboxes</h4>
                                        <div className="space-y-6 p-6 bg-white/5 rounded-xl border border-white/5">
                                            <Checkbox label="Default Checkbox" />
                                            <Checkbox label="Checked by Default" defaultChecked />
                                            <Checkbox label="Disabled Checkbox" disabled />
                                            <Checkbox label={
                                                <span>I agree to the <span className="text-primary-400 underline">Terms and Conditions</span></span>
                                            } />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Feedback */}
                        <div className="space-y-12">
                            <div className="flex items-center gap-3">
                                <IconLoader size={20} className="text-secondary-cyan-500" />
                                <h3 className="text-sm font-medium text-neutral-5 uppercase tracking-wider">Feedback Indicators</h3>
                            </div>
                            <div className="bg-background-400 p-8 md:p-12 rounded-2xl border border-white/10">
                                <div className="flex flex-wrap items-center gap-16">
                                    <div className="flex flex-col gap-4 items-center">
                                        <Loader size="sm" />
                                        <span className="text-[10px] font-mono opacity-40">sm</span>
                                    </div>
                                    <div className="flex flex-col gap-4 items-center">
                                        <Loader size="md" />
                                        <span className="text-[10px] font-mono opacity-40">md</span>
                                    </div>
                                    <div className="flex flex-col gap-4 items-center">
                                        <Loader size="lg" />
                                        <span className="text-[10px] font-mono opacity-40">lg</span>
                                    </div>
                                    <div className="flex flex-col gap-4 items-center">
                                        <Loader size="md" color="white" />
                                        <span className="text-[10px] font-mono opacity-40">color="white"</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Overlays */}
                        <div className="space-y-12">
                            <div className="flex items-center gap-3">
                                <IconAppWindow size={20} className="text-secondary-cyan-500" />
                                <h3 className="text-sm font-medium text-neutral-5 uppercase tracking-wider">Overlays & Modals</h3>
                            </div>
                            <div className="bg-background-400 p-8 md:p-12 rounded-2xl border border-white/10">
                                <div className="flex flex-wrap gap-6">
                                    <Button variant="outline" onClick={() => setIsModalOpen(true)}>
                                        Open Example Modal
                                    </Button>
                                    <Button variant="outline" onClick={() => setIsDialogOpen(true)}>
                                        Trigger Confirmation Dialog
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Modal Examples */}
                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title="Design System Modal"
                >
                    <div className="space-y-6">
                        <p className="text-neutral-5">
                            This is an example of the shared Modal component. It handles backdrops,
                            transitions, and accessibility features like scroll-locking and ESC-to-close.
                        </p>
                        <div className="flex justify-end gap-3">
                            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Close</Button>
                            <Button variant="primary" onClick={() => setIsModalOpen(false)}>Save Changes</Button>
                        </div>
                    </div>
                </Modal>

                <ConfirmationDialog
                    isOpen={isDialogOpen}
                    onClose={() => setIsDialogOpen(false)}
                    onConfirm={() => {
                        console.log('Confirmed');
                        setIsDialogOpen(false);
                    }}
                    title="Are you absolutely sure?"
                    message="This action cannot be undone. This will permanently delete your account and remove your data from our servers."
                    confirmText="Yes, delete account"
                    variant="danger"
                />

            </main>

            <footer className="max-w-7xl mx-auto mt-32 pt-8 border-t border-white/10 text-center text-neutral-100 text-sm">
                <p>&copy; {new Date().getFullYear()} Mune Design System. Built with Tailwind CSS 4 & Framer Motion.</p>
            </footer>
        </div>
    );
};

const SectionTitle = ({ icon: Icon, title }: { icon: any, title: string }) => (
    <div className="flex items-center gap-3 mb-8">
        <div className="p-2.5 bg-primary-500/10 rounded-xl border border-primary-500/20 text-primary-400">
            <Icon size={SECTION_ICON_SIZE} />
        </div>
        <h2 className="text-3xl font-bold font-display">{title}</h2>
    </div>
);

const ColorGroup = ({ title, colors, labels }: { title: string, colors: string[], labels: string[] }) => (
    <div className="space-y-6">
        <h3 className="text-sm font-medium text-neutral-5 uppercase tracking-wider">{title}</h3>
        <div className="space-y-3">
            {colors.map((color, i) => (
                <div key={color} className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl ${color} border border-white/10`} />
                    <div className="flex flex-col">
                        <span className="font-medium text-white">{labels[i]}</span>
                        <span className="text-xs font-mono text-white opacity-60">{color.replace('bg-', '')}</span>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default DesignSystem;
