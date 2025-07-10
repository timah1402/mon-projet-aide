#!/bin/bash

echo "🔧 Correction des navigations restantes..."

# Fonction pour corriger les navigations dans un fichier
fix_navigation_in_file() {
    local file=$1
    echo "   - Correction de $file"
    
    # Détecter s'il y a encore des usages de navigation.navigate
    if grep -q "navigation\.navigate" "$file"; then
        echo "     ⚠️  Navigation non convertie détectée"
        
        # Ajouter les remplacements spécifiques pour les écrans Host
        sed -i.bak 's/navigation\.navigate(\s*item\.screen\s*)/navigateToScreen(item.screen)/g' "$file"
        sed -i.bak 's/navigation\.navigate(\s*feature\.screen\s*)/navigateToScreen(feature.screen)/g' "$file"
        sed -i.bak 's/navigation\.navigate(\s*option\.screen\s*)/navigateToScreen(option.screen)/g' "$file"
        
        # Remplacements directs pour les écrans Host
        sed -i.bak 's/navigation\.navigate(\'\''HostPaymentScreen\'\'')/router.push("\/host-payment")/g' "$file"
        sed -i.bak 's/navigation\.navigate(\'\''ListChatScreen\'\'')/router.push("\/list-chat")/g' "$file"
        sed -i.bak 's/navigation\.navigate(\'\''HostReviewScreen\'\'')/router.push("\/host-reviews")/g' "$file"
        sed -i.bak 's/navigation\.navigate(\'\''ReservationRequestsScreen\'\'')/router.push("\/reservation-requests")/g' "$file"
        sed -i.bak 's/navigation\.navigate(\'\''MonitoringScreen\'\'')/router.push("\/monitoring")/g' "$file"
        sed -i.bak 's/navigation\.navigate(\'\''HostMyListingsScreen\'\'')/router.push("\/host-my-listings")/g' "$file"
        
        # Remplacements pour les écrans Tenant
        sed -i.bak 's/navigation\.navigate(\'\''TenantFeaturesScreen\'\'')/router.push("\/tenant-features")/g' "$file"
        sed -i.bak 's/navigation\.navigate(\'\''TenantReservationsScreen\'\'')/router.push("\/tenant-reservations")/g' "$file"
        sed -i.bak 's/navigation\.navigate(\'\''TenantPaymentMethodsScreen\'\'')/router.push("\/tenant-payment-methods")/g' "$file"
        sed -i.bak 's/navigation\.navigate(\'\''TenantTransactionsScreen\'\'')/router.push("\/tenant-transactions")/g' "$file"
        sed -i.bak 's/navigation\.navigate(\'\''TenantDisputeScreen\'\'')/router.push("\/tenant-dispute")/g' "$file"
        sed -i.bak 's/navigation\.navigate(\'\''TenantReviewScreen\'\'')/router.push("\/tenant-review")/g' "$file"
        
        # Remplacements pour les écrans Expediteur
        sed -i.bak 's/navigation\.navigate(\'\''ExpediteurFeaturesScreen\'\'')/router.push("\/expediteur-features")/g' "$file"
        sed -i.bak 's/navigation\.navigate(\'\''DeliveryRequestScreen\'\'')/router.push("\/delivery-request")/g' "$file"
        sed -i.bak 's/navigation\.navigate(\'\''DeliveryHistoryScreen\'\'')/router.push("\/delivery-history")/g' "$file"
        sed -i.bak 's/navigation\.navigate(\'\''DeliveryTransactionsScreen\'\'')/router.push("\/delivery-transactions")/g' "$file"
        sed -i.bak 's/navigation\.navigate(\'\''ExpediteurDisputeScreen\'\'')/router.push("\/expediteur-dispute")/g' "$file"
        sed -i.bak 's/navigation\.navigate(\'\''ExpediteurPaymentMethodsScreen\'\'')/router.push("\/expediteur-payment-methods")/g' "$file"
        sed -i.bak 's/navigation\.navigate(\'\''SearchingDriverScreen\'\'')/router.push("\/searching-driver")/g' "$file"
        sed -i.bak 's/navigation\.navigate(\'\''DriverFoundScreen\'\'')/router.push("\/driver-found")/g' "$file"
        
        # Remplacements pour les écrans Driver
        sed -i.bak 's/navigation\.navigate(\'\''DriverFeatureScreen\'\'')/router.push("\/driver-features")/g' "$file"
        sed -i.bak 's/navigation\.navigate(\'\''DriverAvailableMissionsScreen\'\'')/router.push("\/driver-available-missions")/g' "$file"
        sed -i.bak 's/navigation\.navigate(\'\''DriverEarningsScreen\'\'')/router.push("\/driver-earnings")/g' "$file"
        
        # Remplacements pour les écrans Admin
        sed -i.bak 's/navigation\.navigate(\'\''AdminFeaturesScreen\'\'')/router.push("\/admin-features")/g' "$file"
        sed -i.bak 's/navigation\.navigate(\'\''AdminHostValidationScreen\'\'')/router.push("\/admin-host-validation")/g' "$file"
        sed -i.bak 's/navigation\.navigate(\'\''AdminDriverValidationScreen\'\'')/router.push("\/admin-driver-validation")/g' "$file"
        sed -i.bak 's/navigation\.navigate(\'\''AdminDisputesScreen\'\'')/router.push("\/admin-disputes")/g' "$file"
        sed -i.bak 's/navigation\.navigate(\'\''AdminIoTAlertsScreen\'\'')/router.push("\/admin-iot-alerts")/g' "$file"
        sed -i.bak 's/navigation\.navigate(\'\''AdminUserManagementScreen\'\'')/router.push("\/admin-user-management")/g' "$file"
        
        # Supprimer les fichiers de sauvegarde
        rm -f "${file}.bak"
        
        echo "     ✅ Navigations corrigées"
    else
        echo "     ✅ Aucune navigation à corriger"
    fi
}

# Corriger tous les fichiers dans screens/
find screens/ -name "*.tsx" -type f | while read file; do
    fix_navigation_in_file "$file"
done

echo ""
echo "🔍 Vérification des navigations restantes..."

# Chercher les navigation.navigate restants
remaining_navigations=$(find screens/ -name "*.tsx" -exec grep -l "navigation\.navigate" {} \;)

if [ -n "$remaining_navigations" ]; then
    echo "⚠️  Navigations restantes trouvées dans:"
    echo "$remaining_navigations"
    echo ""
    echo "📝 Ces fichiers nécessitent une correction manuelle."
    echo "Recherchez 'navigation.navigate' et remplacez par 'router.push()'."
else
    echo "✅ Toutes les navigations ont été converties!"
fi

echo ""
echo "🎯 Créer un helper pour les navigations dynamiques..."

# Créer un helper pour les navigations dynamiques
cat > utils/navigationHelper.ts << 'EOF'
import { router } from 'expo-router';

// Helper pour naviguer vers les écrans avec les anciens noms
export const navigateToScreen = (screenName: string, params?: any) => {
  const routeMap: { [key: string]: string } = {
    // Host screens
    'HostPaymentScreen': '/host-payment',
    'ListChatScreen': '/list-chat',
    'HostReviewScreen': '/host-reviews',
    'ReservationRequestsScreen': '/reservation-requests',
    'MonitoringScreen': '/monitoring',
    'HostMyListingsScreen': '/host-my-listings',
    'HostFeaturesScreen': '/host-features',
    
    // Tenant screens
    'TenantFeaturesScreen': '/tenant-features',
    'TenantReservationsScreen': '/tenant-reservations',
    'TenantPaymentMethodsScreen': '/tenant-payment-methods',
    'TenantTransactionsScreen': '/tenant-transactions',
    'TenantDisputeScreen': '/tenant-dispute',
    'TenantReviewScreen': '/tenant-review',
    'CreateListingScreen': '/create-listing',
    'SearchScreen': '/search',
    'ViewDetailsScreen': '/view-details',
    'ReservationEditScreen': '/reservation-edit',
    
    // Expediteur screens
    'ExpediteurFeaturesScreen': '/expediteur-features',
    'DeliveryRequestScreen': '/delivery-request',
    'DeliveryHistoryScreen': '/delivery-history',
    'DeliveryTransactionsScreen': '/delivery-transactions',
    'ExpediteurDisputeScreen': '/expediteur-dispute',
    'ExpediteurPaymentMethodsScreen': '/expediteur-payment-methods',
    'SearchingDriverScreen': '/searching-driver',
    'DriverFoundScreen': '/driver-found',
    
    // Driver screens
    'DriverFeatureScreen': '/driver-features',
    'DriverAvailableMissionsScreen': '/driver-available-missions',
    'DriverEarningsScreen': '/driver-earnings',
    
    // Admin screens
    'AdminFeaturesScreen': '/admin-features',
    'AdminHostValidationScreen': '/admin-host-validation',
    'AdminDriverValidationScreen': '/admin-driver-validation',
    'AdminDisputesScreen': '/admin-disputes',
    'AdminIoTAlertsScreen': '/admin-iot-alerts',
    'AdminUserManagementScreen': '/admin-user-management',
    
    // Shared screens
    'ChatScreen': '/chat',
    'LeaveReviewScreen': '/leave-review',
    'TrackingScreen': '/tracking',
    'InvoiceDetailScreen': '/invoice-detail',
  };

  const route = routeMap[screenName];
  
  if (route) {
    if (params) {
      router.push({ pathname: route, params });
    } else {
      router.push(route);
    }
  } else {
    console.warn(`Route non trouvée pour: ${screenName}`);
  }
};

// Helper pour remplacer navigation.navigate dans vos composants
export const navigate = navigateToScreen;
EOF

echo "✅ Helper de navigation créé dans utils/navigationHelper.ts"
echo ""
echo "💡 Vous pouvez maintenant utiliser:"
echo "import { navigateToScreen } from '../utils/navigationHelper';"
echo "navigateToScreen(item.screen);"

echo ""
echo "🎉 Correction terminée!"