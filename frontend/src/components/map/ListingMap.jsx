import { Circle, MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { House } from 'lucide-react';
import { houseIcon } from '../../lib/leaflet';

export default function ListingMap({ listing }) {
    const coordinates = listing?.coordinates;
    const isAvailable =
        coordinates?.lat != null &&
        coordinates?.lng != null;

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-[Archivo] font-semibold">Where you'll be</h2>
            <p className='text-base opacity-90'>
                {listing?.location}, {listing?.country}
            </p>

            {!isAvailable ? (
                <p className="text-center font-[mulish] font-semibold text-zinc-400">
                    Map unavailable for this location
                </p>
            ) : (
                <MapContainer
                    center={[coordinates.lat, coordinates.lng]}
                    zoom={14}
                    className="w-full h-[60dvh] rounded-2xl"
                >
                    <TileLayer 
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; OpenStreetMap contributors'
                    />

                    <Circle 
                        center={[coordinates.lat, coordinates.lng]}
                        radius={700}
                        pathOptions={{ 
                            fillOpacity: 0.3,
                            stroke: false,
                            
                        }}
                    />

                    <Marker 
                        position={[coordinates.lat, coordinates.lng]}
                        icon={houseIcon}
                    >
                        <Popup>
                            {listing.title}
                        </Popup>
                    </Marker>
                </MapContainer>
            )}

            <p className='font-[Mulish] font-semibold text-sm opacity-90'>
                Exact location will be shared after your reservation is confirmed
            </p>
        </div>
    );
}