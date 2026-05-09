import Rule from "@components/Rule";
import type { JSX } from "react";

export default function UserProfileView(): JSX.Element {
    return (
        <div className="w-full space-y-8">
            <div>
                <h2 className="text-2xl font-bold">My Profile</h2>
                <p className="opacity-60">Manage your personal information, preferences, and account details.</p>
            </div>
            <div className="space-y-8">
                <section className="border border-indigo-500 p-4">
                    <Rule direction="horizontal" position="start" text="Personal Information" />
                </section>
                <section className="border border-indigo-500 p-4 space-y-4">
                    <Rule direction="horizontal" position="start" text="Additional Details" />
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <h3 className="text-lg font-bold">Bio</h3>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Magnam sapiente voluptas facere quibusdam? Provident, sunt
                                magnam ab perspiciatis quam consequuntur sapiente laudantium
                                maxime iusto exercitationem hic debitis dolores deserunt nulla!
                            </p>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-lg font-bold">Linked Accounts</h3>

                        </div>
                    </div>
                </section>
                <section className="border border-indigo-500 p-4">
                    <Rule direction="horizontal" position="start" text="Personal Information" />
                </section>
                <section className="border border-indigo-500 p-4">
                    <Rule direction="horizontal" position="start" text="More Details" />
                </section>
                <section className="border border-indigo-500 p-4">
                    <Rule direction="horizontal" position="start" text="Personal Information" />
                </section>
                <section className="border border-indigo-500 p-4">
                    <Rule direction="horizontal" position="start" text="Personal Information" />
                </section>
                <section className="border border-indigo-500 p-4">
                    <Rule direction="horizontal" position="start" text="More Details" />
                </section>
            </div>
        </div>
    );
}